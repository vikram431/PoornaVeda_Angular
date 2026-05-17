import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface HeroSlide {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {

  // CONFIGURABLE SLIDES
  slides: HeroSlide[] = [
    {
      badge: '100% Pure & Traditional Wellness',
      title: 'Nourish Your Body.',
      highlight: 'Restore Your Soul.',
      description: 'Experience the power of ancient Indian wisdom with handcrafted wellness products. From nutrient-rich superfoods to sacred remedies.',
      image: 'assets/hero-wellness.png',
      ctaText: 'Shop Pure Wellness',
      ctaLink: '/products'
    }
    // ,
    // {
    //   badge: 'Artisanal Heritage Textiles',
    //   title: 'Timeless Beauty.',
    //   highlight: 'Woven with Love.',
    //   description: 'Discover our collection of handwoven silks and cottons, crafted by master artisans using traditional techniques passed down through generations.',
    //   image: 'assets/hero-textiles-new.png',

    //   ctaText: 'Explore Collection',
    //   ctaLink: '/products'
    // },
    // {
    //   badge: 'Sacred Rituals & Home',
    //   title: 'Purify Your Space.',
    //   highlight: 'Calm Your Mind.',
    //   description: 'Create a sanctuary at home with our authentic ritual essentials and natural incense, designed to bring peace and sacredness to your daily life.',
    //   image: 'assets/hero-rituals.png',
    //   ctaText: 'Shop Rituals',
    //   ctaLink: '/products'
    // }

  ];

  currentSlideIndex = 0;
  private slideInterval: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  startAutoSlide() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  stopAutoSlide() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlideIndex = index;
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
