import { personalInfo, educationData } from '../data/portfolioData';
import TiltCard from './TiltCard';
import {
  User,
  GraduationCap,
  Sparkles,
  MapPin,
  Mail,
  Phone,
  BookOpen,
  Award,
  Cpu,
  BarChart,
  CheckCircle2,
} from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="section-header-wrap">
        <div className="section-pill">
          <User size={14} className="text-gold" />
          <span>Profile & Academic Journey</span>
        </div>
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">
          Passionate about building AI solutions that address real-world challenges in healthcare, governance, and enterprise automation.
        </p>
      </div>

      <div className="about-layout-grid">
        {/* Left Column: Bio & Highlights */}
        <div className="about-bio-col">
          <TiltCard className="about-bio-card" maxTilt={5}>
            <h3 className="bio-card-title">
              <Sparkles size={20} className="text-gold" /> Professional Overview
            </h3>
            <p className="bio-paragraph">{personalInfo.summary}</p>

            <div className="bio-meta-row">
              <div className="bio-meta-item">
                <MapPin size={16} className="text-gold" />
                <div>
                  <span className="meta-label">Location</span>
                  <span className="meta-val">{personalInfo.location}</span>
                </div>
              </div>
              <div className="bio-meta-item">
                <Mail size={16} className="text-gold" />
                <div>
                  <span className="meta-label">College Email</span>
                  <span className="meta-val">{personalInfo.email}</span>
                </div>
              </div>
              <div className="bio-meta-item">
                <Phone size={16} className="text-gold" />
                <div>
                  <span className="meta-label">Phone</span>
                  <span className="meta-val">{personalInfo.phoneDisplay}</span>
                </div>
              </div>
            </div>

            {/* Core Capability Cards */}
            <div className="about-mini-cards">
              <div className="mini-card">
                <div className="mini-card-icon-box gold">
                  <Cpu size={18} />
                </div>
                <div>
                  <h4 className="mini-card-title">GenAI & RAG Systems</h4>
                  <p className="mini-card-desc">End-to-end LLM orchestration, vector search & semantic retrieval.</p>
                </div>
              </div>

              <div className="mini-card">
                <div className="mini-card-icon-box sky">
                  <BarChart size={18} />
                </div>
                <div>
                  <h4 className="mini-card-title">Data Analytics & BI</h4>
                  <p className="mini-card-desc">Power BI KPI dashboards, SQL warehousing & predictive analytics.</p>
                </div>
              </div>

              <div className="mini-card">
                <div className="mini-card-icon-box emerald">
                  <Award size={18} />
                </div>
                <div>
                  <h4 className="mini-card-title">Patents & Inventions</h4>
                  <p className="mini-card-desc">2 filed intellectual property patents in healthcare AI and dream interpretation.</p>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Right Column: Education */}
        <div className="about-edu-col">
          <div className="edu-col-header">
            <GraduationCap size={22} className="text-gold" />
            <h3 className="edu-col-title">Education</h3>
          </div>

          <div className="edu-cards-stack">
            {educationData.map((edu, idx) => (
              <TiltCard key={idx} className="edu-card" maxTilt={6}>
                <div className="edu-card-top">
                  <div className="edu-icon-wrap">
                    {idx === 0 ? <GraduationCap size={22} /> : <BookOpen size={22} />}
                  </div>
                  <div className="edu-title-block">
                    <span className="edu-period-pill">{edu.period}</span>
                    <h4 className="edu-degree">{edu.degree}</h4>
                    <p className="edu-institution">{edu.institution}</p>
                  </div>
                </div>

                <div className="edu-score-banner">
                  <span className="edu-score-label">Academic Standing:</span>
                  <span className="edu-score-val">{edu.score}</span>
                </div>

                <ul className="edu-highlights-list">
                  {edu.highlights.map((h, i) => (
                    <li key={i}>
                      <CheckCircle2 size={14} className="edu-check-icon" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
