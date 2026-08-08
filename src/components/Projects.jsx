import { useState } from 'react';
import { projectsData } from '../data/portfolioData';
import TiltCard from './TiltCard';
import ProjectModal from './ProjectModal';
import { GithubIcon } from './SocialIcons';
import {
  Award,
  BarChart,
  Eye,
  Star,
  Cpu,
  ArrowUpRight,
  Sparkles,
  LayoutGrid,
  List,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'compact'

  const filterTabs = [
    { id: 'all', label: 'All Projects', count: projectsData.length },
    {
      id: 'starred',
      label: '⭐ Starred & Patents',
      count: projectsData.filter((p) => p.starred || p.patentFiled).length,
    },
    {
      id: 'genai',
      label: 'Gen AI & RAG',
      count: projectsData.filter((p) => p.filterCategory === 'genai').length,
    },
    {
      id: 'webgis',
      label: 'WebGIS & Systems',
      count: projectsData.filter((p) => p.filterCategory === 'webgis' || p.filterCategory === 'systems').length,
    },
    {
      id: 'powerbi',
      label: 'Power BI & Analytics',
      count: projectsData.filter((p) => p.filterCategory === 'powerbi').length,
    },
  ];

  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'starred') return p.starred || p.patentFiled;
    if (activeFilter === 'webgis') return p.filterCategory === 'webgis' || p.filterCategory === 'systems';
    return p.filterCategory === activeFilter;
  });

  const handlePatentBadgeClick = (e, project) => {
    e.stopPropagation();
    if (project.patentFiled) {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#EC4899', '#38BDF8'],
      });
    }
  };

  return (
    <section id="projects" className="section">
      <div className="section-header-wrap">
        <div className="section-pill">
          <Cpu size={14} className="text-gold" />
          <span>Innovation Portfolio</span>
        </div>
        <h2 className="section-title">Featured Projects & Systems</h2>
        <p className="section-subtitle">
          Intelligent Generative AI assistants, patented healthcare frameworks, WebGIS platforms, and comprehensive Power BI dashboards.
        </p>
      </div>

      {/* Filter Tabs & Mobile View Switcher */}
      <div className="projects-controls-bar">
        <div className="projects-filter-bar">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              className={`project-tab-btn ${activeFilter === tab.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(tab.id)}
            >
              <span>{tab.label}</span>
              <span className="tab-count-pill">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* View density toggle for mobile / desktop */}
        <div className="projects-density-toggle" title="Switch layout density">
          <button
            className={`density-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            aria-label="Standard Grid View"
          >
            <LayoutGrid size={14} />
            <span className="density-label">Grid</span>
          </button>
          <button
            className={`density-btn ${viewMode === 'compact' ? 'active' : ''}`}
            onClick={() => setViewMode('compact')}
            aria-label="Compact Mobile View"
          >
            <List size={14} />
            <span className="density-label">Compact</span>
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className={`projects-cards-grid ${viewMode === 'compact' ? 'compact-view-active' : ''}`}>
        {filteredProjects.map((project) => (
          <TiltCard
            key={project.id}
            className={`project-glass-card group ${viewMode === 'compact' ? 'project-card-compact-mode' : ''}`}
            maxTilt={6}
            onClick={() => setSelectedProject(project)}
          >
            <div className="project-card-inner">
              {/* Project Image Banner - 100% Unobstructed and Crystal Clear */}
              <div className="project-card-image-wrap">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-card-img"
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
                <div className="project-card-img-gradient"></div>
              </div>

              {/* Card Body */}
              <div className="project-card-body-content">
                {/* Clean Meta Row: Category Badge & Highlights */}
                <div className="project-card-meta-row">
                  <span className="project-category-badge">{project.category}</span>
                  <div className="project-meta-badges">
                    {project.starred && (
                      <span className="star-highlight-pill" title="Featured Star Project">
                        <Star size={12} fill="#FFD700" color="#FFD700" /> Star
                      </span>
                    )}
                    {project.patentFiled && (
                      <span
                        className="patent-badge-shimmer"
                        onClick={(e) => handlePatentBadgeClick(e, project)}
                        title="Official Patent Filed"
                      >
                        <Award size={12} /> Patent Filed
                      </span>
                    )}
                  </div>
                </div>

                {/* Title with CSS Grid MinMax Truncation System */}
                <div className="project-card-title-grid">
                  <h3 className="project-card-title" title={project.title}>
                    <span className="project-card-title-text">{project.title}</span>
                  </h3>
                </div>
                <p className="project-card-desc" title={project.description}>
                  {project.description}
                </p>

                {/* Tags Cloud */}
                <div className="project-tags-cloud">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="project-tag-pill">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="project-tag-pill tag-more" title="Tap Details for full tech stack">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="project-card-actions" onClick={(e) => e.stopPropagation()}>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-proj-primary"
                      title="Open Live Application"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight size={15} />
                    </a>
                  )}

                  {project.powerBiUrl && (
                    <a
                      href={project.powerBiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-proj-powerbi"
                      title="Open Power BI Interactive Dashboard"
                    >
                      <BarChart size={15} />
                      <span>Power BI</span>
                    </a>
                  )}

                  {project.githubUrl && !project.liveUrl?.includes('github') && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-proj-icon"
                      title="View Source Code on GitHub"
                      aria-label="GitHub Repository"
                    >
                      <GithubIcon size={17} />
                    </a>
                  )}

                  <button
                    className="btn-proj-details"
                    onClick={() => setSelectedProject(project)}
                    title="View full architectural details"
                  >
                    <Eye size={15} />
                    <span>Details</span>
                  </button>
                </div>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;
