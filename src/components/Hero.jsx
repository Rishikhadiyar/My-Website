import { ArrowUpRight } from 'lucide-react';
import { siteMeta, socialLinks } from '../data/social';
import './Hero.css';

const trustSignals = [
  'Python, Django, DRF architecture',
  'React and TypeScript product interfaces',
  'PostgreSQL, Supabase, production deployment',
];

const Hero = () => {
  return (
    <section className="hero" id="hero">
      <div className="container hero-content">
        <div className="hero-badge">Rishi Khadiyar — Full Stack Engineer</div>

        <h1 className="hero-title">
          I build reliable<br />
          <span className="highlight">web products</span><br />
          end to end.
        </h1>

        <p className="hero-desc">
          I focus on practical software engineering: clear backend boundaries, robust APIs,
          thoughtful UI systems, and production delivery. Based in {siteMeta.location}, working
          with teams that care about quality and shipping.
        </p>

        <div className="hero-actions">
          <a href="#work" className="btn-primary mono">
            View Case Studies
          </a>
          <a href="#contact" className="btn-secondary mono">
            Contact Me
          </a>
        </div>

        <ul className="hero-signals">
          {trustSignals.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="hero-socials">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.ariaLabel}
              className="hero-social-link"
            >
              {link.label} <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
