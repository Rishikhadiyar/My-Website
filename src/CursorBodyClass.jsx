import { useEffect } from 'react';

export default function CursorBodyClass() {
  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      const active = finePointer.matches && !reducedMotion.matches;
      document.body.classList.toggle('custom-cursor-active', active);
    };

    update();
    finePointer.addEventListener('change', update);
    reducedMotion.addEventListener('change', update);
    return () => {
      document.body.classList.remove('custom-cursor-active');
      finePointer.removeEventListener('change', update);
      reducedMotion.removeEventListener('change', update);
    };
  }, []);

  return null;
}
