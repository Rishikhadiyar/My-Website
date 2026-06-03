import { useState, useEffect } from 'react';
import { ArrowUpRight, X, Mail, Send, Copy, Check } from 'lucide-react';
import { siteMeta, socialLinks } from '../data/social';
import './Contact.css';

const Contact = () => {
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleEmailClick = (e) => {
    e.preventDefault();
    setEmailModalOpen(true);
  };

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(siteMeta.email);
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy email', err);
    }
  };

  const closeEmailModal = () => setEmailModalOpen(false);

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <p className="section-label">Contact</p>

        <div className="contact-layout">
          <div className="contact-banner">
            <h2 className="contact-title">Let&apos;s work on something meaningful.</h2>
            <p className="contact-copy">
              {siteMeta.availability}. I am most useful on product teams that need strong backend
              implementation and a clean frontend delivery pipeline.
            </p>
            <a href={`mailto:${siteMeta.email}`} onClick={handleEmailClick} className="btn-primary mono contact-cta">
              Email {siteMeta.email} <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>

          <div className="contact-meta">
            <div className="contact-row">
              <span className="contact-label mono">Email</span>
              <a href={`mailto:${siteMeta.email}`} onClick={handleEmailClick} className="contact-link">
                {siteMeta.email} <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>

            <div className="contact-row">
              <span className="contact-label mono">Phone</span>
              <a href={`tel:${siteMeta.phoneTel}`} className="contact-link">
                {siteMeta.phone} <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>

            <div className="contact-row">
              <span className="contact-label mono">Location</span>
              <p className="contact-text">{siteMeta.location}</p>
            </div>

            <div className="contact-row">
              <span className="contact-label mono">Profiles</span>
              <div className="contact-socials">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.ariaLabel}
                  >
                    {link.label} <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Choice Modal */}
      <div className={`email-modal-overlay ${emailModalOpen ? 'open' : ''}`} onClick={closeEmailModal}>
        <div className="email-modal-content" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="email-modal-title">
          <button className="email-modal-close" onClick={closeEmailModal} aria-label="Close modal">
            <X size={20} />
          </button>
          
          <div className="email-modal-header">
            <h3 id="email-modal-title" className="email-modal-title">Contact {siteMeta.name.split(' ')[0]}</h3>
            <p className="email-modal-desc">Choose how you&apos;d like to send an email.</p>
          </div>
          
          <div className="email-modal-options">
            <a 
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${siteMeta.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="email-option-btn"
              onClick={closeEmailModal}
            >
              <div className="email-option-icon"><Send size={18} /></div>
              <div className="email-option-content">
                <span className="email-option-label">Send with Gmail</span>
                <span className="email-option-sub">Opens Gmail in a new tab</span>
              </div>
            </a>

            <a 
              href={`mailto:${siteMeta.email}`}
              className="email-option-btn"
              onClick={closeEmailModal}
            >
              <div className="email-option-icon"><Mail size={18} /></div>
              <div className="email-option-content">
                <span className="email-option-label">Default Mail App</span>
                <span className="email-option-sub">Opens your computer&apos;s email app</span>
              </div>
            </a>

            <button 
              className={`email-option-btn ${copied ? 'copied' : ''}`}
              onClick={copyEmailToClipboard}
            >
              <div className="email-option-icon">
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </div>
              <div className="email-option-content">
                <span className="email-option-label">{copied ? 'Copied!' : 'Copy Email Address'}</span>
                <span className="email-option-sub">{siteMeta.email}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
