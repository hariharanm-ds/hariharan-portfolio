import { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './SocialIcons';
import TiltCard from './TiltCard';
import {
  Sparkles,
  Download,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Award,
  Cpu,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const Hero = () => {
  const roles = personalInfo.roles;
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 90;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        if (charIndex + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayText(currentRole.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex((roleIndex + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex, roles]);

  const triggerCelebration = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FFD700', '#F59E0B', '#38BDF8', '#10B981'],
    });
  };

  return (
    <section id="hero" className="hero-section">
      {/* Background ambient lighting */}
      <div className="hero-ambient-glow glow-gold"></div>
      <div className="hero-ambient-glow glow-blue"></div>

      <div className="hero-container">
        {/* LEFT COLUMN: Main Info */}
        <div className="hero-left-content">
          {/* Status Badge */}
          <div className="hero-status-badge">
            <span className="status-indicator-dot pulse"></span>
            <span className="status-text">{personalInfo.status}</span>
            <span className="status-location">
              <MapPin size={12} /> {personalInfo.location}
            </span>
          </div>

          {/* Heading */}
          <div className="hero-heading-group">
            <span className="hero-eyebrow">Hello, World! I am</span>
            <h1 className="hero-glitch-title">
              <span className="name-highlight">{personalInfo.name}</span>
            </h1>
          </div>

          {/* Dynamic Typing Title with Zero Layout Shift */}
          <div className="hero-dynamic-role" aria-live="polite" aria-label={`Specializing in ${roles[roleIndex]}`}>
            <span className="role-prefix">Specializing in</span>
            <div className="typing-text-wrapper">
              <span className="typing-text">{displayText || '\u00A0'}</span>
              <span className="typing-cursor" aria-hidden="true"></span>
            </div>
          </div>

          {/* Mobile Visual Layout: Displayed right after Specializing running titles on mobile devices */}
          <div className="hero-mobile-visual-slot">
            <div className="hero-3d-scene">
              <div className="cyber-orbit-ring ring-1"></div>
              <div className="cyber-orbit-ring ring-2"></div>
              <div className="cyber-orbit-ring ring-3"></div>

              <TiltCard
                className="hero-glass-card hero-photo-only-card"
                maxTilt={14}
                glare={true}
                onClick={triggerCelebration}
                title="Touch or hover for 3D Holographic effect ✨"
              >
                <div className="hero-avatar-wrapper hero-photo-only-wrapper">
                  <img
                    src={personalInfo.avatar}
                    alt="Hariharan M"
                    className="hero-avatar-image"
                    loading="eager"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/professional_image.png';
                    }}
                  />
                  <div className="touch-hint-badge">
                    <Sparkles size={12} className="text-gold" />
                    <span>3D Touch Interactive</span>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>

          {/* Tagline / Summary */}
          <p className="hero-description">
            AI & Data Science undergraduate building cutting-edge{' '}
            <strong className="text-gold">Generative AI</strong>,{' '}
            <strong className="text-gold">RAG architectures</strong>, and{' '}
            <strong className="text-gold">Power BI analytical intelligence</strong> systems.
            Inventor with 2 filed patents and national hackathon podiums.
          </p>

          {/* Quick Stats Pill Strip */}
          <div className="hero-quick-stats">
            <div className="quick-stat-pill" onClick={triggerCelebration} title="Click to celebrate!">
              <Award size={14} className="text-gold" />
              <span><strong>2</strong> Patents Filed</span>
            </div>
            <div className="quick-stat-pill">
              <Cpu size={14} className="text-sky" />
              <span><strong>8+</strong> AI & Analytics Projects</span>
            </div>
            <div className="quick-stat-pill">
              <CheckCircle2 size={14} className="text-emerald" />
              <span><strong>8.32</strong> B.Tech CGPA</span>
            </div>
          </div>

          {/* Hero Action Buttons */}
          <div className="hero-cta-group">
            <a
              href={personalInfo.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero-primary"
            >
              <Download size={18} />
              <span>View Resume</span>
            </a>

            <a
              href="#projects"
              className="btn-hero-secondary"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('projects');
                if (el) {
                  const navHeight = 80;
                  const pos = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
                  window.scrollTo({ top: pos, behavior: 'smooth' });
                }
              }}
            >
              <span>Explore Projects</span>
              <ArrowRight size={16} />
            </a>

            <div className="hero-social-links">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-icon-btn"
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-icon-btn"
                aria-label="LinkedIn Profile"
                title="LinkedIn"
              >
                <LinkedinIcon size={20} />
              </a>
              <a
                href={personalInfo.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-icon-btn"
                aria-label="LeetCode Profile"
                title="LeetCode Profile"
              >
                <LeetcodeIcon size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D Holographic Visual Card with Interactive Touch/Tilt (Desktop) */}
        <div className="hero-right-visual hero-desktop-visual">
          <div className="hero-3d-scene">
            {/* Rotating Cyber Rings for ambient aura */}
            <div className="cyber-orbit-ring ring-1"></div>
            <div className="cyber-orbit-ring ring-2"></div>
            <div className="cyber-orbit-ring ring-3"></div>

            {/* Central Holographic Photo Card with 3D Touch Interaction */}
            <TiltCard
              className="hero-glass-card hero-photo-only-card"
              maxTilt={16}
              glare={true}
              onClick={triggerCelebration}
              title="Touch or hover for 3D Holographic effect ✨"
            >
              <div className="hero-avatar-wrapper hero-photo-only-wrapper">
                <img
                  src={personalInfo.avatar}
                  alt="Hariharan M"
                  className="hero-avatar-image"
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/professional_image.png';
                  }}
                />
                <div className="touch-hint-badge">
                  <Sparkles size={12} className="text-gold" />
                  <span>3D Touch Interactive</span>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
