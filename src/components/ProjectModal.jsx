import { useEffect } from 'react';
import { GithubIcon } from './SocialIcons';
import {
  X,
  ExternalLink,
  Award,
  Sparkles,
  CheckCircle2,
  BarChart,
  Layers,
  Star,
  ArrowLeft,
} from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-content glass-modal"
        onClick={(e) => e.stopPropagation()}
        style={{ transform: 'scale(1)', animation: 'modalPop 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Sticky Top Navigation Bar - Always visible on mobile & desktop during scroll */}
        <div className="modal-sticky-nav-bar">
          <button
            className="modal-nav-back-btn"
            onClick={onClose}
            aria-label="Back to Projects"
          >
            <ArrowLeft size={16} />
            <span>Back to Projects</span>
          </button>
          <div className="modal-nav-center-title">
            <span>{project.title}</span>
          </div>
          <button
            className="modal-nav-close-icon"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Visual Banner */}
        {project.image && (
          <div className="modal-banner-wrap">
            <img
              src={project.image}
              alt={project.title}
              className="modal-banner-img"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null;
                if (project.fallbackImage) {
                  e.currentTarget.src = project.fallbackImage;
                }
              }}
            />
            <div className="modal-banner-overlay"></div>
          </div>
        )}

        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="modal-badge-row">
              {project.patentFiled && (
                <span className="badge-patent-modal">
                  <Award size={14} /> Patent Filed
                </span>
              )}
              {project.starred && (
                <span className="star-highlight-pill">
                  <Star size={12} fill="#FFD700" color="#FFD700" /> Star Project
                </span>
              )}
              <span className="badge-cat-modal">{project.category}</span>
            </div>
            <h2 className="modal-heading">{project.title}</h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Main Description */}
          <div className="modal-desc-section">
            <p className="modal-main-desc">{project.longDescription || project.description}</p>
          </div>

          {/* Key Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="modal-highlights-section">
              <h4 className="modal-section-title">
                <Sparkles size={16} className="text-gold" /> Key Technical Highlights
              </h4>
              <ul className="modal-highlights-list">
                {project.highlights.map((hl, i) => (
                  <li key={i}>
                    <CheckCircle2 size={16} className="highlight-check-icon" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          <div className="modal-tags-section">
            <h4 className="modal-section-title">
              <Layers size={16} className="text-gold" /> Technology Stack
            </h4>
            <div className="modal-tag-cloud">
              {project.tags.map((tag, i) => (
                <span key={i} className="modal-tag-chip">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer / Action Links */}
        <div className="modal-footer">
          <div className="modal-footer-actions-left">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-modal-primary"
              >
                <span>Live Demo</span>
                <ExternalLink size={15} />
              </a>
            )}
            {project.powerBiUrl && (
              <a
                href={project.powerBiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-modal-powerbi"
              >
                <BarChart size={15} />
                <span>Power BI</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-modal-secondary"
              >
                <GithubIcon size={15} />
                <span>Source Code</span>
              </a>
            )}
          </div>

          {/* Explicit Back / Close button at bottom */}
          <button
            className="btn-modal-close-return"
            onClick={onClose}
            aria-label="Back to portfolio"
          >
            <ArrowLeft size={15} />
            <span>Close & Return</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
