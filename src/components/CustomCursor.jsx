import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

function useCustomCursorEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      setEnabled(finePointer.matches && !reducedMotion.matches);
    };

    update();
    finePointer.addEventListener('change', update);
    reducedMotion.addEventListener('change', update);
    return () => {
      finePointer.removeEventListener('change', update);
      reducedMotion.removeEventListener('change', update);
    };
  }, []);

  return enabled;
}

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const coordsRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const enabled = useCustomCursorEnabled();

  useEffect(() => {
    if (!enabled) return undefined;

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      setCoords({ x: Math.round(clientX), y: Math.round(clientY) });

      gsap.to(cursorRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: 'none',
      });

      gsap.to(ringRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.5,
        ease: 'power2.out',
      });

      gsap.to(coordsRef.current, {
        x: clientX + 20,
        y: clientY + 20,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const onMouseDown = () => {
      gsap.to(ringRef.current, { scale: 0.5, duration: 0.2 });
    };

    const onMouseUp = () => {
      gsap.to(ringRef.current, { scale: 1, duration: 0.2 });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    const handleHover = () => {
      gsap.to(ringRef.current, { scale: 1.5, borderColor: 'rgba(255,255,255,0.8)', duration: 0.3 });
    };
    const handleHoverOut = () => {
      gsap.to(ringRef.current, { scale: 1, borderColor: 'rgba(255,255,255,0.2)', duration: 0.3 });
    };

    const interactives = document.querySelectorAll('a, button, .work-item');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleHoverOut);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleHoverOut);
      });
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="custom-cursor-wrapper custom-cursor-active" aria-hidden="true">
      <div className="cursor-dot" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />
      <div className="cursor-coords" ref={coordsRef}>
        <span className="coord-label">X</span> {coords.x} <br />
        <span className="coord-label">Y</span> {coords.y}
      </div>
    </div>
  );
};

export default CustomCursor;
