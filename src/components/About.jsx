import { experience } from '../data/experience';
import { primaryStack } from '../data/skills';
import { siteMeta } from '../data/social';
import './About.css';

const principles = [
  'Design APIs and data models around product behavior, not around framework defaults.',
  'Keep implementations readable and stable so teams can iterate without fear.',
  'Treat performance, accessibility, and security as part of feature completion.',
];

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <p className="section-label">About</p>
        <div className="about-layout">
          <div className="about-main">
            <h2 className="about-heading">Engineering for product teams that ship with intent.</h2>
            <p className="about-summary">
              I am a full-stack engineer based in {siteMeta.location}, working across Python
              backends and React frontends. My work focuses on making systems dependable in
              production while keeping implementation quality high for future contributors.
            </p>

            <h3 className="about-subhead">How I work</h3>
            <ul className="about-principles">
              {principles.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <aside className="about-side">
            <div className="about-block">
              <p className="about-block-label mono">Experience Snapshot</p>
              {experience.map((job) => (
                <div key={job.id} className="about-job">
                  <p className="about-job-role">{job.role}</p>
                  <p className="about-job-meta mono">
                    {job.company} | {job.period}
                  </p>
                </div>
              ))}
            </div>

            <div className="about-block">
              <p className="about-block-label mono">Primary Stack</p>
              <div className="about-stack-list">
                {primaryStack.map((tech) => (
                  <span key={tech} className="about-stack-item">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default About;
