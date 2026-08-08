import { useState, useEffect } from 'react';
import { inspiredQuotes } from '../data/portfolioData';
import TiltCard from './TiltCard';
import { Quote, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const InspiredQuotes = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % inspiredQuotes.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % inspiredQuotes.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + inspiredQuotes.length) % inspiredQuotes.length);
  };

  const currentQuote = inspiredQuotes[currentIndex];

  return (
    <section id="inspired-quotes" className="section quotes-section">
      <div className="section-header-wrap">
        <div className="section-pill">
          <Sparkles size={14} className="text-gold" />
          <span>Guiding Philosophies</span>
        </div>
        <h2 className="section-title">Words of Inspiration</h2>
        <p className="section-subtitle">
          Principles and thoughts from visionaries that fuel my relentless curiosity, discipline, and pursuit of excellence.
        </p>
      </div>

      <div className="quote-carousel-wrapper">
        <TiltCard className="quote-spotlight-card" maxTilt={5}>
          <div className="quote-card-inner">
            <div className="quote-icon-bubble">
              <Quote size={32} className="text-gold" />
            </div>

            <div className="quote-text-container">
              <p className="quote-main-text">“{currentQuote.text}”</p>

              <div className="quote-author-block">
                <h4 className="quote-author-name">{currentQuote.author}</h4>
                <p className="quote-author-role">{currentQuote.role}</p>
              </div>
            </div>

            {/* Navigation and Indicators */}
            <div className="quote-nav-controls">
              <button
                className="quote-nav-arrow"
                onClick={handlePrev}
                aria-label="Previous quote"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="quote-dots-indicator">
                {inspiredQuotes.map((_, idx) => (
                  <button
                    key={idx}
                    className={`quote-dot ${currentIndex === idx ? 'active' : ''}`}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentIndex(idx);
                    }}
                    aria-label={`Go to quote ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                className="quote-nav-arrow"
                onClick={handleNext}
                aria-label="Next quote"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
};

export default InspiredQuotes;
