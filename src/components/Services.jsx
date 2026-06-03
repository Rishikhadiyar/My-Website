import { services } from '../data/services';
import './Services.css';

const collaborationModel = [
  {
    title: 'Scope the right problem',
    detail: 'Align on outcomes, constraints, and success metrics before implementation starts.',
  },
  {
    title: 'Build in vertical slices',
    detail: 'Ship backend and frontend increments together so progress stays demoable and testable.',
  },
  {
    title: 'Harden for production',
    detail: 'Finalize reliability, edge cases, and deployment confidence before handoff.',
  },
];

const Services = () => {
  return (
    <section className="services-section" id="process">
      <div className="container">
        <div className="services-header">
          <p className="section-label">Process</p>
          <h2 className="section-title">How I collaborate with product teams.</h2>
          <p className="services-copy">
            The goal is simple: reduce ambiguity, ship useful iterations quickly, and keep long-term
            maintainability in the codebase.
          </p>
        </div>

        <div className="services-workflow">
          {collaborationModel.map((item, index) => (
            <article key={item.title} className="workflow-item">
              <span className="workflow-step mono">Phase {index + 1}</span>
              <h3 className="workflow-title">{item.title}</h3>
              <p className="workflow-detail">{item.detail}</p>
            </article>
          ))}
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.id}>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
