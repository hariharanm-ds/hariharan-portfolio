import { useState } from 'react';
import { freelanceData } from '../data/portfolioData';
import TiltCard from './TiltCard';
import { ExternalLink, Heart, Store, Sparkles, CheckCircle2, Globe, ChevronDown, ChevronUp } from 'lucide-react';

const Freelance = () => {
  const [expandedCards, setExpandedCards] = useState({});

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="freelance" className="section">
      <div className="section-header-wrap">
        <div className="section-pill">
          <Store size={14} className="text-gold" />
          <span>Client & Production Work</span>
        </div>
        <h2 className="section-title">Freelance Web Deployments</h2>
        <p className="section-subtitle">
          Real-world client web applications designed, engineered, and deployed for local business growth.
        </p>
      </div>

      <div className="freelance-grid">
        {freelanceData.map((item) => {
          const isExpanded = expandedCards[item.id];
          return (
            <TiltCard key={item.id} className="freelance-card" maxTilt={6}>
              <div className="freelance-card-inner">
                {/* Image Preview Banner */}
                {item.image && (
                  <div className="freelance-img-wrap">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="freelance-banner-img"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        if (item.fallbackImage) {
                          e.currentTarget.src = item.fallbackImage;
                        }
                      }}
                    />
                    <div className="freelance-img-overlay"></div>
                    <div className="freelance-badge-overlay">
                      <span className="live-status-pill">
                        <span className="live-dot pulse"></span>
                        {item.badge}
                      </span>
                      {item.id === 'mathi-stores' && (
                        <span className="mom-love-tag">
                          <Heart size={12} fill="#EF4444" color="#EF4444" /> Mom's Store
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Body */}
                <div className="freelance-body-padding">
                  <div className="freelance-title-block">
                    <h3 className="freelance-title">{item.title}</h3>
                    <p className="freelance-subtitle">{item.subtitle}</p>
                  </div>

                  {/* Role & Description */}
                  <div className="freelance-role-tag">
                    <span>Role: <strong>{item.role}</strong></span>
                  </div>

                  <p className="freelance-desc">{item.description}</p>

                  {/* Key Responsibilities - Compact on mobile with toggle */}
                  <div className="freelance-resp-box">
                    <div
                      className="freelance-resp-header-row"
                      onClick={() => toggleExpand(item.id)}
                    >
                      <h4 className="freelance-resp-heading">Core Contributions:</h4>
                      <button
                        className="btn-resp-toggle-mobile"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(item.id);
                        }}
                        aria-label="Toggle contribution details"
                      >
                        {isExpanded ? (
                          <><span>Less</span><ChevronUp size={14} /></>
                        ) : (
                          <><span>All ({item.responsibilities.length})</span><ChevronDown size={14} /></>
                        )}
                      </button>
                    </div>

                    <ul className={`freelance-resp-list ${!isExpanded ? 'list-mobile-condensed' : ''}`}>
                      {(isExpanded ? item.responsibilities : item.responsibilities.slice(0, 2)).map((resp, i) => (
                        <li key={i}>
                          <CheckCircle2 size={15} className="resp-check-icon" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Tags */}
                  <div className="freelance-tags">
                    {item.tags.slice(0, 4).map((tag, i) => (
                      <span key={i} className="freelance-tag-chip">
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 4 && (
                      <span className="freelance-tag-chip tag-more-pill">
                        +{item.tags.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="freelance-footer">
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-freelance-live"
                    >
                      <Globe size={16} />
                      <span>Visit Live Website</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
};

export default Freelance;
