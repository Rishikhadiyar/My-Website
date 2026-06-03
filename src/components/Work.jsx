import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';
import './Work.css';

const base = import.meta.env.BASE_URL;
const withBase = (path) => `${base}${path.replace(/^\//, '')}`;

const WorkCase = ({ project }) => {
  const hasLink = Boolean(project.url && project.url !== '#');
  const linkLabel = project.url.includes('github.com') ? 'View Repository' : 'Open Live Project';
  const screenshots = project.screenshots?.length
    ? project.screenshots
    : [{ src: project.img, alt: project.alt }];
  const galleryScreenshots = screenshots.length > 1 ? screenshots.slice(1) : screenshots;

  return (
    <article className="work-case">
      <img 
        className="work-case-image" 
        src={withBase(project.img)} 
        alt={project.alt} 
        loading="lazy" 
        decoding="async"
        style={project.imgPosition ? { objectPosition: project.imgPosition } : undefined}
      />

      <div className="work-case-body">
        <p className="work-case-meta mono">
          <span>{project.year}</span>
          {project.role && <span>{project.role}</span>}
          <span>{project.category}</span>
        </p>

        <h3 className="work-case-title">{project.title}</h3>
        <p className="work-case-desc">{project.description}</p>
        {project.contribution && (
          <p className="work-case-contribution">
            <strong>Contribution note:</strong> {project.contribution}
          </p>
        )}

        <div className="work-case-points">
          <p>
            <strong>Problem:</strong> {project.problem}
          </p>
          <p>
            <strong>Build:</strong> {project.build}
          </p>
          <p>
            <strong>Result:</strong> {project.result}
          </p>
        </div>

        {project.metrics?.length ? (
          <div className="work-case-metrics">
            {project.metrics.map((metric) => (
              <span key={metric}>{metric}</span>
            ))}
          </div>
        ) : null}

        {project.uiHighlights?.length ? (
          <div className="work-case-ui">
            <p className="work-case-ui-title mono">UI Walkthrough Highlights</p>
            <ul>
              {project.uiHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {galleryScreenshots.length ? (
          <div className="work-case-gallery">
            <p className="work-case-ui-title mono">Product Screenshots</p>
            <div className="work-case-shot-grid">
              {galleryScreenshots.map((shot, index) => (
                <a
                  key={shot.src}
                  href={withBase(shot.src)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-case-shot-link"
                  aria-label={`Open ${project.title} screenshot ${index + 2}`}
                >
                  <img
                    className="work-case-shot"
                    src={withBase(shot.src)}
                    alt={shot.alt || `${project.title} screenshot ${index + 2}`}
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              ))}
            </div>
          </div>
        ) : null}

        {hasLink ? (
          <a
            href={project.url}
            className="work-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title}`}
          >
            {linkLabel} <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        ) : (
          <span className="work-link work-link-disabled">Live link available on request</span>
        )}
      </div>
    </article>
  );
};

const Work = () => {
  return (
    <section className="work-section" id="work">
      <div className="container">
        <p className="section-label">Work</p>
        <h2 className="work-title-main">Selected engineering case studies.</h2>
        <p className="work-subtitle">
          Four projects that show how I approach product requirements, architecture decisions, and
          production delivery.
        </p>

        <div className="work-list">
          {projects.map((project) => (
            <WorkCase key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
