import { useCallback, useEffect, useRef, useState } from 'react';
import './Navbar.css';

const base = import.meta.env.BASE_URL;

const NAV_ITEMS = ['work', 'about', 'process', 'proof'];

const Navbar = () => {
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navRef.current?.classList.add('scrolled');
      } else {
        navRef.current?.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const menu = menuRef.current;
    const focusable = menu?.querySelectorAll(
      'button, a[href], [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];
    first?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeMenu();
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !focusable?.length) return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen, closeMenu]);

  return (
    <nav className="navbar" ref={navRef} aria-label="Primary">
      <div className="navbar-inner">
        <button
          type="button"
          className="nav-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Rishi Khadiyar - scroll to top"
        >
          <img
            src={`${base}logo.png`}
            alt="RK Logo"
            className="nav-logo-img"
          />
        </button>

        <ul className="nav-links hide-mobile" role="list">
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <button type="button" onClick={() => scrollTo(item)} className="nav-link">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="nav-menu-toggle show-mobile-only"
          ref={menuButtonRef}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          <span className={`nav-menu-icon ${menuOpen ? 'open' : ''}`} aria-hidden="true" />
        </button>

        <button
          type="button"
          className="btn-outline nav-cta hide-mobile"
          onClick={() => scrollTo('contact')}
        >
          Contact
        </button>
      </div>

      <div
        id="mobile-nav-menu"
        ref={menuRef}
        className={`nav-mobile-panel ${menuOpen ? 'open' : ''}`}
        hidden={!menuOpen}
      >
        <ul className="nav-mobile-links" role="list">
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <button type="button" onClick={() => scrollTo(item)} className="nav-link">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="btn-outline nav-cta-mobile"
              onClick={() => scrollTo('contact')}
            >
              Contact
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
