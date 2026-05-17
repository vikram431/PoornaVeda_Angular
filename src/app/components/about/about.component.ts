import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="about-page">
      <!-- Hero Section -->
      <section class="about-hero">
        <div class="container">
          <div class="hero-content">
            <span class="pre-title">Our Heritage</span>
            <h1>Preserving the Soul of <span class="highlight">India</span></h1>
            <p>Bringing complete Indian wisdom to the modern world through authentic traditions.</p>
          </div>
        </div>
      </section>

      <!-- Vision & Mission -->
      <section class="vision-mission container">
        <div class="vision-grid">
          <div class="vision-card glass">
            <div class="icon-circle"><i class="fa-solid fa-eye"></i></div>
            <h3>Our Vision</h3>
            <p>To be the global bridge connecting modern lifestyles with the profound, wholesome wisdom of ancient India.</p>
          </div>
          <div class="vision-card glass">
            <div class="icon-circle"><i class="fa-solid fa-bullseye"></i></div>
            <h3>Our Mission</h3>
            <p>To curate and deliver authentic Indian experiences that nurture the body, enlighten the mind, and celebrate our shared heritage.</p>
          </div>
        </div>
      </section>

      <!-- The Story -->
      <section class="story-deep container">
        <div class="story-flex">
          <div class="story-image">
            <img src="assets/philosophy-story.png" alt="Traditional India">
          </div>
          <div class="story-text">
            <h2>A Journey Back to <span class="highlight">Roots</span></h2>
            <p>PoornaVeda was born from a simple realization: in the rush toward progress, we were losing touch with the "Poorna" (wholesome) and "Veda" (knowledge) that once defined our lives.</p>
            <p>Our journey began in the small villages of India, where recipes were passed down through generations and every craft was a form of meditation. We decided to bring these soulful traditions into your homes.</p>
            <div class="stat-grid">
              <div class="stat">
                <span class="number">50+</span>
                <span class="label">Artisan Partners</span>
              </div>
              <div class="stat">
                <span class="number">100%</span>
                <span class="label">Natural Origin</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Core Values -->
      <section class="values-section">
        <div class="container">
          <h2 class="text-center">Values That Guide Us</h2>
          <div class="values-grid">
            <div class="value-item">
              <i class="fa-solid fa-leaf"></i>
              <h4>Authenticity</h4>
              <p>We never compromise on traditional methods or pure ingredients.</p>
            </div>
            <div class="value-item">
              <i class="fa-solid fa-hand-holding-heart"></i>
              <h4>Purity</h4>
              <p>Every product is a testament to the "Poorna" way of living — complete and untainted.</p>
            </div>
            <div class="value-item">
              <i class="fa-solid fa-earth-asia"></i>
              <h4>Sustainability</h4>
              <p>Protecting the earth that provides our bounty is at the heart of what we do.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .about-page { background: var(--bg-cream); font-family: 'Outfit', sans-serif; }
    .about-hero {
      height: 60vh;
      background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/assets/philosophy-story.png');
      background-size: cover;
      background-position: center;
      display: flex;
      align-items: center;
      text-align: center;
      color: white;
    }
    .pre-title { display: block; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 4px; margin-bottom: 1rem; color: var(--accent-gold); }
    .about-hero h1 { font-size: 4rem; font-weight: 800; margin-bottom: 1.5rem; }
    .about-hero p { font-size: 1.25rem; max-width: 700px; margin: 0 auto; opacity: 0.9; }
    .highlight { color: var(--accent-gold); }

    .vision-mission { margin: -5rem auto 5rem; position: relative; z-index: 10; }
    .vision-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
    .vision-card { padding: 3rem; text-align: center; border-radius: 24px; border: 1px solid rgba(255,255,255,0.3); }
    .icon-circle { width: 60px; height: 60px; background: var(--primary-green); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin: 0 auto 1.5rem; }
    .vision-card h3 { font-size: 1.75rem; margin-bottom: 1rem; color: var(--text-deep); }
    .vision-card p { color: var(--text-muted); line-height: 1.7; }

    .story-deep { padding: 5rem 0; }
    .story-flex { display: flex; align-items: center; gap: 4rem; }
    .story-image { flex: 1; }
    .story-image img { width: 100%; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
    .story-text { flex: 1.2; }
    .story-text h2 { font-size: 3rem; margin-bottom: 2rem; color: var(--text-deep); }
    .story-text p { font-size: 1.1rem; line-height: 1.8; color: var(--text-muted); margin-bottom: 1.5rem; }
    
    .stat-grid { display: flex; gap: 3rem; margin-top: 3rem; }
    .stat { display: flex; flex-direction: column; }
    .stat .number { font-size: 2.5rem; font-weight: 800; color: var(--primary-green); }
    .stat .label { font-size: 0.9rem; color: #888; text-transform: uppercase; letter-spacing: 1px; }

    .values-section { background: white; padding: 6rem 0; }
    .values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; margin-top: 4rem; }
    .value-item { text-align: center; }
    .value-item i { font-size: 3rem; color: var(--primary-green); margin-bottom: 1.5rem; }
    .value-item h4 { font-size: 1.5rem; margin-bottom: 1rem; }
    .value-item p { color: var(--text-muted); line-height: 1.6; }

    @media (max-width: 768px) {
      .about-hero h1 { font-size: 2.5rem; }
      .vision-grid, .story-flex, .values-grid { grid-template-columns: 1fr; flex-direction: column; }
      .story-flex { gap: 2rem; }
    }
  `]
})
export class AboutComponent {}
