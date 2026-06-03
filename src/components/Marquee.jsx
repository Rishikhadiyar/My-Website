import { marqueeTech } from '../data/skills';
import './Marquee.css';

const Marquee = () => (
  <section className="marquee-section" aria-label="Primary toolbelt">
    <div className="container">
      <p className="section-label">Toolbelt</p>
      <div className="toolbelt-wrap">
        {marqueeTech.map((item) => (
          <span key={item} className="toolbelt-item mono">
            {item}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default Marquee;
