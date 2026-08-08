import { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import {
  Menu,
  X,
  Sparkles,
  Download,
  Code2,
  Brain,
  Home,
  User,
  Wrench,
  Cpu,
  Store,
  Trophy,
  Award,
  Mail,
} from 'lucide-react';

const navLinks = [
  { href: '#hero', label: 'Home', icon: Home },
  { href: '#about', label: 'About', icon: User },
  { href: '#skills', label: 'Skills', icon: Wrench },
  { href: '#projects', label: 'Projects', icon: Cpu },
  { href: '#freelance', label: 'Freelance', icon: Store },
  { href: '#achievements', label: 'Achievements', icon: Trophy },
  { href: '#credentials', label: 'Credentials', icon: Award },
  { href: '#contact', label: 'Contact', icon: Mail },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Determine active section
      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Update URL hash without jumping
      if (window.history.pushState) {
        window.history.pushState(null, '', href);
      }
      setActiveSection(targetId);
    }
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled-glass' : ''}`}>
      <nav className="navbar-container">
        {/* Brand Logo */}
        <a
          href="#hero"
          className="navbar-logo-link"
          onClick={(e) => scrollToSection(e, '#hero')}
        >
          <div className="logo-icon-box">
            <span className="logo-initials">HM</span>
          </div>
          <div className="logo-text-block">
            <span className="logo-name">Hariharan M</span>
            <span className="logo-role">AI Engineer & Analyst</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="desktop-nav-links">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link-item ${isActive ? 'active' : ''}`}
                onClick={(e) => scrollToSection(e, link.href)}
              >
                <Icon size={14} className="nav-icon-subtle" />
                <span>{link.label}</span>
                {isActive && <span className="active-dot-indicator"></span>}
              </a>
            );
          })}
        </div>

        {/* Action Button: Resume */}
        <div className="navbar-action-right">
          <a
            href={personalInfo.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-resume-btn"
          >
            <Download size={14} />
            <span>Resume</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-glass">
          <div className="mobile-links-stack">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`mobile-link-item ${isActive ? 'active' : ''}`}
                  onClick={(e) => scrollToSection(e, link.href)}
                >
                  <Icon size={18} className="text-gold" />
                  <span>{link.label}</span>
                </a>
              );
            })}
            <a
              href={personalInfo.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-resume-action-btn"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Download size={16} />
              <span>Download Resume PDF</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
