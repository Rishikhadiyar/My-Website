import { ArrowUpRight } from 'lucide-react';
import {
  featuredRepos,
  collaborationProof,
  workshops,
  certifications,
  currentFocus,
  opportunityFocus,
  profileLinks,
} from '../data/proof';
import './Proof.css';

const linkItem = (item) => (
  <a href={item.url} target="_blank" rel="noopener noreferrer">
    {item.label || item.name || item.title} <ArrowUpRight size={14} aria-hidden="true" />
  </a>
);

const Proof = () => {
  return (
    <section className="proof-section" id="proof">
      <div className="container">
        <p className="section-label">Proof</p>
        <h2 className="proof-title">Public proof of work, learning, and momentum.</h2>

        <div className="proof-grid">
          <article className="proof-card">
            <h3>Featured Repositories</h3>
            <div className="proof-list">
              {featuredRepos.map((repo) => (
                <div key={repo.url} className="proof-item">
                  {linkItem(repo)}
                  <p>{repo.note}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="proof-card">
            <h3>Collaboration Evidence</h3>
            <div className="proof-list">
              {collaborationProof.map((item) => (
                <div key={item.url} className="proof-item">
                  {linkItem(item)}
                </div>
              ))}
            </div>

            <h3 className="proof-subhead">Current Focus</h3>
            <ul className="proof-chip-list">
              {currentFocus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="proof-card">
            <h3>Workshops</h3>
            <div className="proof-list">
              {workshops.map((item) => (
                <div key={item.url} className="proof-item">
                  {linkItem(item)}
                  {item.note && <p>{item.note}</p>}
                </div>
              ))}
            </div>

            <h3 className="proof-subhead">Certifications</h3>
            <ul className="proof-bullets">
              {certifications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="proof-card">
            <h3>Opportunity Preferences</h3>
            <p className="proof-opportunity">{opportunityFocus}</p>

            <h3 className="proof-subhead">Profile and Live Links</h3>
            <div className="proof-list">
              {profileLinks.map((item) => (
                <div key={item.url} className="proof-item">
                  {linkItem(item)}
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Proof;
