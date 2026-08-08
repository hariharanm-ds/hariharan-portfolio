import { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import TiltCard from './TiltCard';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './SocialIcons';
import {
  Mail,
  Phone,
  MapPin,
  Code2,
  Copy,
  Check,
  Send,
  Download,
  MessageSquare,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const Contact = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const mailSubject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
    const mailBody = encodeURIComponent(
      `Hello Hariharan,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${mailSubject}&body=${mailBody}`;

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FFD700', '#10B981', '#38BDF8'],
    });
  };

  return (
    <section id="contact" className="section">
      <div className="section-header-wrap">
        <div className="section-pill">
          <MessageSquare size={14} className="text-gold" />
          <span>Get in Touch</span>
        </div>
        <h2 className="section-title">Let’s Build Something Remarkable</h2>
        <p className="section-subtitle">
          Whether you're looking to collaborate on Generative AI systems, RAG applications, data analytics, or discuss full-time roles.
        </p>
      </div>

      <div className="contact-layout-grid">
        {/* Left Column: Direct Contact Cards */}
        <div className="contact-info-col">
          {/* Main Direct Email Card */}
          <TiltCard className="contact-glass-card" maxTilt={6}>
            <div className="contact-card-inner">
              <div className="contact-card-icon-wrap gold">
                <Mail size={22} />
              </div>
              <div className="contact-card-content">
                <span className="contact-card-sub">Institutional Email</span>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="contact-card-link"
                >
                  {personalInfo.email}
                </a>
              </div>
              <button
                className="copy-btn-action"
                onClick={() => handleCopyEmail(personalInfo.email)}
                title="Copy email address"
              >
                {copiedEmail ? <Check size={16} className="text-emerald" /> : <Copy size={16} />}
              </button>
            </div>
            {copiedEmail && (
              <div className="copy-toast-inline">
                <Check size={12} /> Copied to clipboard!
              </div>
            )}
          </TiltCard>

          {/* Secondary Email Card */}
          <TiltCard className="contact-glass-card" maxTilt={6}>
            <div className="contact-card-inner">
              <div className="contact-card-icon-wrap sky">
                <Mail size={22} />
              </div>
              <div className="contact-card-content">
                <span className="contact-card-sub">Personal Email</span>
                <a
                  href={`mailto:${personalInfo.personalEmail}`}
                  className="contact-card-link"
                >
                  {personalInfo.personalEmail}
                </a>
              </div>
              <button
                className="copy-btn-action"
                onClick={() => handleCopyEmail(personalInfo.personalEmail)}
                title="Copy personal email"
              >
                <Copy size={16} />
              </button>
            </div>
          </TiltCard>

          {/* Direct Phone Card */}
          <TiltCard className="contact-glass-card" maxTilt={6}>
            <div className="contact-card-inner">
              <div className="contact-card-icon-wrap emerald">
                <Phone size={22} />
              </div>
              <div className="contact-card-content">
                <span className="contact-card-sub">Direct Line / WhatsApp</span>
                <a href={`tel:${personalInfo.phone}`} className="contact-card-link">
                  {personalInfo.phoneDisplay}
                </a>
              </div>
              <a
                href={`https://wa.me/916383908109?text=Hi%20Hariharan,%20I%20saw%20your%20portfolio!`}
                target="_blank"
                rel="noopener noreferrer"
                className="copy-btn-action whatsapp"
                title="Chat on WhatsApp"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </TiltCard>

          {/* Location & Resume Strip */}
          <div className="contact-meta-strip">
            <div className="location-pill-wrap">
              <MapPin size={15} className="text-gold" />
              <span>{personalInfo.location}</span>
            </div>
            <a
              href={personalInfo.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-pill-btn"
            >
              <Download size={14} />
              <span>Download PDF Resume</span>
            </a>
          </div>

          {/* Social Profiles Grid */}
          <div className="social-profiles-grid">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-profile-card"
            >
              <LinkedinIcon size={20} className="social-icon-li" />
              <div className="social-text-block">
                <span className="social-platform">LinkedIn</span>
                <span className="social-handle">hariharan-m</span>
              </div>
              <ExternalLink size={14} className="social-arrow" />
            </a>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-profile-card"
            >
              <GithubIcon size={20} className="social-icon-gh" />
              <div className="social-text-block">
                <span className="social-platform">GitHub</span>
                <span className="social-handle">hariharanm-ds</span>
              </div>
              <ExternalLink size={14} className="social-arrow" />
            </a>

            <a
              href={personalInfo.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="social-profile-card"
            >
              <LeetcodeIcon size={20} className="social-icon-lc" />
              <div className="social-text-block">
                <span className="social-platform">LeetCode</span>
                <span className="social-handle">Hariharan-AI-DS</span>
              </div>
              <ExternalLink size={14} className="social-arrow" />
            </a>
          </div>
        </div>

        {/* Right Column: Quick Interactive Inquiry Form */}
        <div className="contact-form-col">
          <TiltCard className="contact-form-card" maxTilt={4}>
            <div className="form-card-header">
              <Sparkles size={18} className="text-gold" />
              <h3 className="form-title">Send a Direct Message</h3>
            </div>
            <p className="form-desc">
              Fill out this quick form to launch a pre-composed message directly to my inbox.
            </p>

            <form onSubmit={handleFormSubmit} className="contact-form-body">
              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="form-name">Your Name</label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="form-email">Your Email</label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    placeholder="e.g. john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="form-subject">Subject</label>
                <input
                  id="form-subject"
                  type="text"
                  required
                  placeholder="e.g. AI Project Collaboration / Job Opportunity"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="form-message">Message</label>
                <textarea
                  id="form-message"
                  rows={4}
                  required
                  placeholder="Share details about your project, idea, or role..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-textarea"
                ></textarea>
              </div>

              <button type="submit" className="btn-form-submit">
                <span>Send Message to Hariharan</span>
                <Send size={16} />
              </button>
            </form>
          </TiltCard>
        </div>
      </div>

      {/* Heartfelt Footer */}
      <div className="portfolio-footer-bottom">
        <div className="footer-love-card">
          <div className="footer-love-badge">
            <span className="heart-pulse-glow">🩷</span>
            <span className="love-badge-text">From the heart</span>
          </div>

          <p className="footer-credits-warm">
            Made with all my heart by <strong className="text-gold-name">Hariharan M</strong> <span className="pink-heart-emoji">🩷</span>
          </p>

          <p className="footer-warm-quote">
            “Crafted not just with code, but with endless curiosity, warm smiles & big dreams ✨”
          </p>

          <p className="footer-sub-warm">
            From Coimbatore, Tamil Nadu with love & gratitude 🌿 • Dedicated to my loving parents & inspiring mentors
          </p>

          <div className="footer-interactive-row">
            <button
              type="button"
              onClick={() => {
                confetti({
                  particleCount: 60,
                  spread: 80,
                  origin: { y: 0.85 },
                  colors: ['#EC4899', '#FFD700', '#F43F5E', '#A855F7', '#FFFBEA'],
                });
              }}
              className="btn-send-love"
              title="Click to send some love!"
            >
              <span className="love-btn-heart">💖</span>
              <span>Send some love to Hariharan!</span>
              <Sparkles size={14} className="text-gold" />
            </button>

            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-scroll-top-warm"
              title="Back to the top"
            >
              <span>Back to Top</span>
              <span>✨</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
