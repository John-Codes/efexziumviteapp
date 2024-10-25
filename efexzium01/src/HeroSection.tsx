
import { ArrowRight, Sparkles } from 'lucide-react';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <div className="hero-container">
      {/* Animated LED background effect */}
      <div className="led-background">
        <div className="gradient-1" />
        <div className="gradient-2" />
      </div>

      <div className="hero-content">
        {/* Main headline with LED effect */}
        <h1 className="hero-title">
          Unlock the Power of LED Advertising
          <div className="hero-subtitle">
            from just <span className="price">$2/day</span>
          </div>
        </h1>

        {/* Animated feature cards */}
        <div className="feature-grid">
          <div className="feature-card purple">
            <Sparkles className="feature-icon" />
            <h3 className="feature-title">RGB Colors</h3>
            <p className="feature-text">Vibrant, eye-catching displays that command attention</p>
          </div>
          <div className="feature-card blue">
            <Sparkles className="feature-icon" />
            <h3 className="feature-title">Weather-Resistant</h3>
            <p className="feature-text">Built to perform in any conditions</p>
          </div>
          <div className="feature-card pink">
            <Sparkles className="feature-icon" />
            <h3 className="feature-title">Free Creative Services</h3>
            <p className="feature-text">Art, video, and music creation included</p>
          </div>
        </div>

        {/* CTA Button */}
        <button className="cta-button">
          <span>Start Advertising Today</span>
          <ArrowRight className="arrow-icon" />
        </button>

        {/* Floating particles effect */}
        <div className="particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}