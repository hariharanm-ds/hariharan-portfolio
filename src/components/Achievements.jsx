import { achievementsData } from '../data/portfolioData';
import TiltCard from './TiltCard';
import {
  Trophy,
  Award,
  Medal,
  FileCheck,
  ShieldCheck,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const iconMap = {
  Trophy,
  Award,
  Medal,
  FileCheck,
  ShieldCheck,
};

const Achievements = () => {
  const triggerConfetti = (idx) => {
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#F59E0B', '#10B981', '#6366F1', '#EC4899'],
    });
  };

  return (
    <section id="achievements" className="section">
      <div className="section-header-wrap">
        <div className="section-pill">
          <Trophy size={14} className="text-gold" />
          <span>Honors & Recognitions</span>
        </div>
        <h2 className="section-title">Competitive Achievements & Podiums</h2>
        <p className="section-subtitle">
          National hackathon recognitions, competitive SQL challenge podiums, and healthcare innovation milestones.
        </p>
      </div>

      <div className="achievements-grid">
        {achievementsData.map((item, idx) => {
          const IconComp = iconMap[item.icon] || Trophy;
          return (
            <TiltCard
              key={item.id}
              className="achievement-card"
              maxTilt={8}
              onClick={() => triggerConfetti(idx)}
              style={{ cursor: 'pointer' }}
            >
              <div className="achievement-card-inner">
                {/* Header row */}
                <div className="achievement-top-row">
                  <div
                    className="achievement-icon-circle"
                    style={{
                      background: `radial-gradient(circle, ${item.accent}25, transparent 70%)`,
                      borderColor: `${item.accent}40`,
                    }}
                  >
                    <IconComp size={24} style={{ color: item.accent }} />
                  </div>
                  <span
                    className="achievement-badge-pill"
                    style={{
                      borderColor: `${item.accent}50`,
                      background: `${item.accent}15`,
                      color: '#FFFBEA',
                    }}
                  >
                    {item.badge}
                  </span>
                </div>

                {/* Title & Organization */}
                <h3 className="achievement-title">{item.title}</h3>
                <div className="achievement-meta">
                  <span className="achievement-org">{item.organization}</span>
                  <span className="achievement-dot">•</span>
                  <span className="achievement-year">{item.year}</span>
                </div>

                {/* Description */}
                <p className="achievement-desc">{item.description}</p>

                {/* Interactive hint */}
                <div className="achievement-footer-hint">
                  <Sparkles size={13} style={{ color: item.accent }} />
                  <span>Click card to celebrate 🎉</span>
                </div>
              </div>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
};

export default Achievements;
