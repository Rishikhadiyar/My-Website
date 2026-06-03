import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initSmoothScroll, prefersReducedMotion } from './lib/scroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Work from './components/Work';
import Services from './components/Services';
import About from './components/About';
import Proof from './components/Proof';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef(null);

  useEffect(() => {
    const { destroy: destroyLenis } = initSmoothScroll();
    let ctx;

    if (!prefersReducedMotion()) {
      ctx = gsap.context(() => {
        const sections = gsap.utils.toArray('section');
        sections.forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }, mainRef);
    }

    return () => {
      destroyLenis();
      ctx?.revert();
    };
  }, []);

  return (
    <div className="app-wrapper">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar />

      <div className="perspective-wrapper">
        <main id="main-content" ref={mainRef}>
          <Hero />
          <Work />
          <About />
          <Services />
          <Proof />
          <Contact />
        </main>
      </div>

      <footer className="site-footer">
        Copyright (c) {new Date().getFullYear()} Rishi Khadiyar. Full Stack Developer.
      </footer>
    </div>
  );
}

export default App;
