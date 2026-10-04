import React from 'react';
import { ArrowRight, Sparkles, Sliders, Download, ShieldCheck } from 'lucide-react';

export default function LandingPage({ onStart }) {
  return (
    <div className="landing-container">
      <div className="landing-hero">
        <h1 className="landing-headline">
          Craft clean, scannable QR codes in seconds.
        </h1>

        <p className="landing-subtext">
          Generate custom QR codes for website links, notes, emails, phone numbers,
          and Wi-Fi networks. Customize colors and sizes with a live preview, then download crisp PNGs.
        </p>

        <div className="landing-cta-row">
          <button
            type="button"
            className="btn btn-primary landing-cta-btn"
            onClick={onStart}
          >
            <span>Create a QR Code</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="landing-cards-grid">
        <div className="landing-feature-card">
          <div className="feature-icon-wrapper">
            <Sliders size={20} />
          </div>
          <h3 className="feature-title">5 Essential Types</h3>
          <p className="feature-desc">
            Website URLs, raw text messages, pre-filled emails, telephone numbers, and one-tap Wi-Fi sign-in codes.
          </p>
        </div>

        <div className="landing-feature-card">
          <div className="feature-icon-wrapper">
            <Sparkles size={20} />
          </div>
          <h3 className="feature-title">Real-Time Customizer</h3>
          <p className="feature-desc">
            Adjust size, margins, foreground, and background colors with instant visual feedback and preset styles.
          </p>
        </div>

        <div className="landing-feature-card">
          <div className="feature-icon-wrapper">
            <Download size={20} />
          </div>
          <h3 className="feature-title">Direct PNG Export</h3>
          <p className="feature-desc">
            Download crisp, high-resolution PNGs directly from your browser. No server storage or account needed.
          </p>
        </div>
      </div>
    </div>
  );
}
