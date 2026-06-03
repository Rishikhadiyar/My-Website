import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function useSceneQuality() {
  return useMemo(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.matchMedia('(max-width: 768px)').matches;
    const lowPower = reducedMotion || mobile;
    return {
      reducedMotion,
      mobile,
      lowPower,
      particleCount: lowPower ? 200 : 900,
      sparkleCount: lowPower ? 0 : 120,
      knotSegments: lowPower ? [1.6, 0.4, 80, 12] : [2.1, 0.55, 220, 24],
      ringSegments: lowPower ? [3.2, 0.02, 8, 64] : [4.8, 0.02, 16, 180],
      enablePointerTilt: !lowPower,
      dpr: lowPower ? [1, 1.25] : [1, 2],
    };
  }, []);
}

function usePointerTilt(enabled) {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return undefined;
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [enabled]);

  return pointer;
}

function Particles({ count }) {
  const points = useRef(null);

  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Stable particle field — seeded pseudo-random for lint/purity
      const seed = (i * 9301 + 49297) % 233280;
      const r = Math.pow(seed / 233280, 0.6) * 20;
      const t = ((seed * 7) % 233280) / 233280 * Math.PI * 2;
      a[i * 3 + 0] = Math.cos(t) * r;
      a[i * 3 + 1] = (((seed * 3) % 233280) / 233280 - 0.5) * 16;
      a[i * 3 + 2] = (((seed * 11) % 233280) / 233280 - 0.5) * 30;
    }
    return a;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!points.current) return;
    points.current.rotation.y = t * 0.08;
    points.current.rotation.x = Math.sin(t * 0.2) * 0.05;
  });

  if (count === 0) return null;

  return (
    <points ref={points} position={[0, 0, -6]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#a7b3ff"
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function HeroObject({ scrollProgress = 0, quality }) {
  const group = useRef(null);
  const knot = useRef(null);
  const ring = useRef(null);
  const pointer = usePointerTilt(quality.enablePointerTilt);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const p = THREE.MathUtils.clamp(scrollProgress, 0, 1);
    const push = THREE.MathUtils.lerp(0, 1, p);
    const tiltX = quality.enablePointerTilt ? pointer.current.y * 0.18 : 0;
    const tiltY = quality.enablePointerTilt ? pointer.current.x * 0.22 : 0;

    if (group.current) {
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        tiltX - 0.12 + push * 0.15,
        5,
        state.clock.getDelta()
      );
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        tiltY + push * 0.35,
        5,
        state.clock.getDelta()
      );
      group.current.position.y = Math.sin(t * 0.8) * 0.35;
      group.current.position.z = THREE.MathUtils.lerp(0, -10, push);
    }

    if (knot.current) {
      knot.current.rotation.x = t * 0.35 + push * 0.8;
      knot.current.rotation.y = t * 0.25;
    }

    if (ring.current) {
      ring.current.rotation.z = -t * 0.4;
      ring.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.03);
      ring.current.material.opacity = 0.15 + (1 - p) * 0.15;
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      <mesh ref={knot}>
        <torusKnotGeometry args={quality.knotSegments} />
        <meshPhysicalMaterial
          color="#0a0b10"
          roughness={0.2}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.18}
          transmission={0.55}
          thickness={0.9}
          ior={1.25}
          envMapIntensity={0.7}
        />
      </mesh>

      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={quality.ringSegments} />
        <meshBasicMaterial color="#7c5cff" transparent opacity={0.25} />
      </mesh>

      {quality.sparkleCount > 0 && (
        <Sparkles
          count={quality.sparkleCount}
          scale={[14, 8, 14]}
          size={3}
          speed={0.5}
          color="#9ee7ff"
          opacity={0.35}
        />
      )}
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <fog attach="fog" args={['#000008', 20, 80]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 10, 6]} intensity={1.1} color="#cfd6ff" />
      <pointLight position={[-8, -3, 10]} intensity={18} distance={40} color="#7c5cff" />
      <pointLight position={[8, 2, 8]} intensity={14} distance={40} color="#3cffc8" />
    </>
  );
}

const Scene3D = ({ scrollProgress = 0 }) => {
  const quality = useSceneQuality();

  return (
    <div className="bg-canvas-container" aria-hidden="true">
      <Canvas
        dpr={quality.dpr}
        gl={{ antialias: !quality.lowPower, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 12], fov: 45 }}
      >
        <color attach="background" args={['#000008']} />
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={45} />
        <SceneLights />
        <Particles count={quality.particleCount} />
        <HeroObject scrollProgress={scrollProgress} quality={quality} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
