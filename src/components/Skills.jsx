import { useState } from 'react';
import { skillsCategories } from '../data/portfolioData';
import TiltCard from './TiltCard';
import {
  Code2,
  Database,
  Sparkles,
  Cpu,
  BrainCircuit,
  Boxes,
  Terminal,
  ScanText,
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp,
  Compass,
  Palette,
  Server,
  HardDrive,
  FileSpreadsheet,
  Binary,
  Activity,
  MapPin,
  GitBranch,
  Code,
  Wrench,
  Layers,
  LayoutGrid,
  ListFilter,
  CheckCircle2,
  Zap,
} from 'lucide-react';

const iconLookup = {
  Code2,
  Database,
  Sparkles,
  Cpu,
  BrainCircuit,
  Boxes,
  Terminal,
  ScanText,
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp,
  Compass,
  Palette,
  Server,
  HardDrive,
  FileSpreadsheet,
  Binary,
  Activity,
  MapPin,
  GitBranch,
  Code,
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('bento'); // 'bento' | 'matrix'

  const filterTabs = [
    { id: 'all', label: 'All Domains' },
    { id: 'genai', label: 'Generative AI & LLMs' },
    { id: 'analytics', label: 'Data & Power BI' },
    { id: 'backend', label: 'Languages & DB' },
    { id: 'tools', label: 'Libraries & Tools' },
  ];

  const visibleCategories =
    activeTab === 'all'
      ? skillsCategories
      : skillsCategories.filter((cat) => cat.id === activeTab);

  return (
    <section id="skills" className="section">
      <div className="section-header-wrap">
        <div className="section-pill">
          <Wrench size={14} className="text-gold" />
          <span>Technical Stack</span>
        </div>
        <h2 className="section-title">Core Skills & Expertise</h2>
        <p className="section-subtitle">
          Engineered across Generative AI architectures, RAG pipelines, Power BI business intelligence, and high-performance backend data systems.
        </p>
      </div>

      {/* Domain Controls & 3D Mode Toggle Bar */}
      <div className="skills-controls-bar">
        <div className="skills-pill-filter-bar">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              className={`skills-filter-pill-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="skills-view-toggle-wrap">
          <button
            className={`skills-view-toggle-btn ${viewMode === 'bento' ? 'active' : ''}`}
            onClick={() => setViewMode('bento')}
            title="3D Bento Grid View"
            aria-label="3D Bento Grid View"
          >
            <LayoutGrid size={15} />
            <span>3D Cards</span>
          </button>
          <button
            className={`skills-view-toggle-btn ${viewMode === 'matrix' ? 'active' : ''}`}
            onClick={() => setViewMode('matrix')}
            title="3D Matrix Cloud View"
            aria-label="3D Matrix Cloud View"
          >
            <ListFilter size={15} />
            <span>3D Matrix</span>
          </button>
        </div>
      </div>

      {/* 3D Bento Cards Grid View */}
      {viewMode === 'bento' ? (
        <div className="skills-3d-bento-grid">
          {visibleCategories.map((category) => {
            const HeaderIcon = iconLookup[category.icon] || Layers;
            return (
              <TiltCard
                key={category.id}
                className="skills-3d-card glass-card"
                maxTilt={9}
                glare={true}
              >
                <div className="skills-3d-card-inner">
                  {/* Glowing 3D Header */}
                  <div className="skills-3d-header">
                    <div
                      className="skills-3d-icon-box"
                      style={{
                        borderColor: `${category.accent}55`,
                        background: `radial-gradient(circle, ${category.accent}25 0%, rgba(10, 14, 24, 0.9) 100%)`,
                        color: category.accent,
                        boxShadow: `0 0 20px ${category.accent}25`,
                      }}
                    >
                      <HeaderIcon size={22} />
                    </div>
                    <div className="skills-3d-title-group">
                      <div className="skills-3d-title-row">
                        <h3 className="skills-3d-title">{category.title}</h3>
                        <span
                          className="skills-3d-count-badge"
                          style={{
                            borderColor: `${category.accent}45`,
                            color: category.accent,
                            background: `${category.accent}15`,
                          }}
                        >
                          {category.skills.length} Skills
                        </span>
                      </div>
                      <p className="skills-3d-summary">{category.summary}</p>
                    </div>
                  </div>

                  {/* 3D Skill Pills Grid */}
                  <div className="skills-3d-pills-wrap">
                    {category.skills.map((skill, sIdx) => {
                      const SkillIcon = iconLookup[skill.icon] || Code2;
                      const isAdvanced = skill.level === 'Advanced';
                      return (
                        <div
                          key={sIdx}
                          className="skill-3d-pill"
                          title={`${skill.name} • ${skill.level}`}
                        >
                          <div
                            className="skill-3d-icon-wrapper"
                            style={{ color: category.accent }}
                          >
                            <SkillIcon size={14} />
                          </div>
                          <span className="skill-3d-name">{skill.name}</span>
                          <span
                            className={`skill-3d-level-badge ${isAdvanced ? 'lvl-advanced' : 'lvl-proficient'}`}
                          >
                            {skill.level}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* 3D Bottom Accent Glow Strip */}
                  <div
                    className="skills-3d-bottom-strip"
                    style={{
                      background: `linear-gradient(90deg, transparent 0%, ${category.accent}66 50%, transparent 100%)`,
                    }}
                  />
                </div>
              </TiltCard>
            );
          })}
        </div>
      ) : (
        /* 3D Matrix Cloud View */
        <div className="skills-3d-matrix-container">
          {visibleCategories.map((category) => {
            const HeaderIcon = iconLookup[category.icon] || Layers;
            return (
              <TiltCard
                key={category.id}
                className="skills-matrix-row-3d glass-card"
                maxTilt={6}
                glare={true}
              >
                <div className="skills-matrix-row-inner">
                  <div
                    className="skills-matrix-cat-tag"
                    style={{
                      borderColor: `${category.accent}55`,
                      background: `linear-gradient(135deg, rgba(15, 20, 32, 0.95), ${category.accent}18)`,
                      color: category.accent,
                    }}
                  >
                    <HeaderIcon size={16} />
                    <span>{category.title}</span>
                    <span className="skills-matrix-count-badge">
                      {category.skills.length}
                    </span>
                  </div>

                  <div className="skills-matrix-chips-wrap">
                    {category.skills.map((skill, sIdx) => {
                      const SkillIcon = iconLookup[skill.icon] || Code2;
                      const isAdvanced = skill.level === 'Advanced';
                      return (
                        <span
                          key={sIdx}
                          className="skill-matrix-pill-3d"
                          title={`${skill.name} • ${skill.level}`}
                        >
                          <SkillIcon size={13} style={{ color: category.accent }} />
                          <span className="skill-matrix-name">{skill.name}</span>
                          <span
                            className={`skill-mini-dot ${isAdvanced ? 'dot-gold' : 'dot-sky'}`}
                            title={skill.level}
                          />
                        </span>
                      );
                    })}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      )}

      {/* 3D Highlight Competencies Footer Strip */}
      <div className="skills-highlight-bar glass-card">
        <div className="skills-highlight-content">
          <div className="skills-highlight-badge">
            <Zap size={14} className="text-gold" />
            <span>Specialized Capabilities</span>
          </div>
          <div className="skills-highlight-tags">
            <span className="spec-tag">
              <CheckCircle2 size={12} className="text-gold" />
              <span>Multi-Source RAG</span>
            </span>
            <span className="spec-tag">
              <CheckCircle2 size={12} className="text-gold" />
              <span>Advanced DAX & Power BI</span>
            </span>
            <span className="spec-tag">
              <CheckCircle2 size={12} className="text-gold" />
              <span>Vector Similarity Search</span>
            </span>
            <span className="spec-tag">
              <CheckCircle2 size={12} className="text-gold" />
              <span>WebGIS Decision Support</span>
            </span>
            <span className="spec-tag">
              <CheckCircle2 size={12} className="text-gold" />
              <span>NLP & OCR Document Pipelines</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

