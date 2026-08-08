import { volunteeringData, certificationsData, areasOfInterest } from '../data/portfolioData';
import TiltCard from './TiltCard';
import {
  Users,
  Sparkles,
  Activity,
  CheckCircle2,
  Award,
  BookOpen,
  Brain,
  Cpu,
  ScanText,
  Network,
  BarChart2,
  TrendingUp,
  PieChart,
  Code,
  Database,
  Shield,
  HeartPulse,
  Globe,
} from 'lucide-react';

const iconMap = {
  Brain,
  Cpu,
  Sparkles,
  ScanText,
  Network,
  BarChart2,
  TrendingUp,
  PieChart,
  Code,
  Database,
  Shield,
  HeartPulse,
  Globe,
  Users,
  Activity,
};

const Credentials = () => {
  return (
    <section id="credentials" className="section">
      <div className="section-header-wrap">
        <div className="section-pill">
          <Award size={14} className="text-gold" />
          <span>Recognition & Passions</span>
        </div>
        <h2 className="section-title">Certifications & Leadership</h2>
        <p className="section-subtitle">
          Professional certifications, campus leadership, event coordination, and core domains of interest.
        </p>
      </div>

      <div className="credentials-grid-layout">
        {/* Left Column: Certifications */}
        <div className="credentials-col">
          <div className="col-header-row">
            <BookOpen className="text-gold" size={20} />
            <h3 className="col-title">Professional Certifications</h3>
          </div>
          <div className="cert-cards-list">
            {certificationsData.map((cert) => (
              <TiltCard key={cert.id} className="cert-card" maxTilt={6}>
                <div className="cert-card-inner">
                  <div className="cert-badge-row">
                    <span className="cert-verified-pill">
                      <CheckCircle2 size={12} className="text-emerald" /> {cert.badge}
                    </span>
                    <span className="cert-year-pill">{cert.date}</span>
                  </div>
                  <h4 className="cert-title">{cert.title}</h4>
                  <div className="cert-issuer">Issued by: <strong>{cert.issuer}</strong></div>
                  <div className="cert-skills-row">
                    {cert.skills.map((s, i) => (
                      <span key={i} className="cert-skill-tag">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* Right Column: Volunteering & Leadership */}
        <div className="credentials-col">
          <div className="col-header-row">
            <Users className="text-gold" size={20} />
            <h3 className="col-title">Volunteering & Leadership</h3>
          </div>
          <div className="volunteer-cards-list">
            {volunteeringData.map((vol) => (
              <TiltCard key={vol.id} className="volunteer-card" maxTilt={6}>
                <div className="volunteer-card-inner">
                  <div className="volunteer-top">
                    <div className="vol-badge-pill">{vol.role}</div>
                    <span className="vol-period">{vol.period}</span>
                  </div>
                  <h4 className="vol-title">{vol.title}</h4>
                  <div className="vol-org">{vol.org}</div>
                  <p className="vol-desc">{vol.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Credentials;
