import { useScrollReveal } from './hooks/useScrollReveal';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Freelance from './components/Freelance';
import Achievements from './components/Achievements';
import Credentials from './components/Credentials';
import InspiredQuotes from './components/InspiredQuotes';
import Contact from './components/Contact';
import ParticleBackground from './components/ParticleBackground';
import './App.css';

function App() {
  // Activate performant IntersectionObserver scroll reveal system
  useScrollReveal('.section, .hero-section, .reveal-on-scroll, .glass-card, .project-card, .skills-minimal-row, .edu-card, .about-bio-card');

  return (
    <div className="portfolio-app-root">
      {/* Interactive Canvas Particle Starfield Background */}
      <ParticleBackground />

      {/* Modern Floating Glassmorphic Header / Navbar */}
      <Navbar />

      {/* Main Sections */}
      <main className="main-content-flow">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Freelance />
        <Achievements />
        <Credentials />
        <InspiredQuotes />
        <Contact />
      </main>
    </div>
  );
}

export default App;
