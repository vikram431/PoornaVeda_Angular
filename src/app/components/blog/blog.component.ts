import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { BlogService, BlogPost } from './blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="blog-page">
      <header class="blog-header">
        <div class="container">
          <h1>Vedic <span class="highlight">Insights</span></h1>
          <p>Exploring the intersections of ancient wisdom and modern wellness.</p>
        </div>
      </header>

      <main class="container">
        <!-- Featured Post -->
        <section class="featured-post card" *ngIf="featuredPost">
          <div class="featured-image">
            <img [src]="featuredPost.image" [alt]="featuredPost.title">
          </div>
          <div class="featured-content">
            <span class="category">{{ featuredPost.category }}</span>
            <h2>{{ featuredPost.title }}</h2>
            <p>{{ featuredPost.excerpt }}</p>
            <div class="meta">
              <span>By {{ featuredPost.author }}</span>
              <span class="dot"></span>
              <span>{{ featuredPost.date }}</span>
            </div>
            <button class="primary-btn sm" [routerLink]="['/blog', featuredPost.id]">Read Article</button>
          </div>
        </section>

        <!-- Blog Grid -->
        <div class="blog-grid">
          <article class="blog-card card" *ngFor="let post of blogPosts">
            <div class="post-image">
              <img [src]="post.image" [alt]="post.title">
              <span class="category">{{ post.category }}</span>
            </div>
            <div class="post-content">
              <div class="date">{{ post.date }}</div>
              <h3>{{ post.title }}</h3>
              <p>{{ post.excerpt }}</p>
              <a class="read-more" [routerLink]="['/blog', post.id]">Read More <i class="fa-solid fa-arrow-right"></i></a>
            </div>
          </article>
        </div>

        <div class="pagination" *ngIf="totalPages > 1">
          <button class="page-btn" [disabled]="currentPage === 0" (click)="loadPage(currentPage - 1)">
             <i class="fa-solid fa-chevron-left"></i> Prev
          </button>
          
          <button class="page-btn" 
                  *ngFor="let page of [].constructor(totalPages); let i = index" 
                  [class.active]="currentPage === i"
                  (click)="loadPage(i)">
            {{ i + 1 }}
          </button>
          
          <button class="page-btn" [disabled]="currentPage === totalPages - 1" (click)="loadPage(currentPage + 1)">
            Next <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .blog-page { background: var(--bg-cream); padding-bottom: 6rem; font-family: 'Outfit', sans-serif; }
    
    .blog-header { 
      padding: 7rem 0 5rem; 
      text-align: center; 
      background: linear-gradient(rgba(255, 255, 255, 0.88), rgba(245, 248, 246, 0.92)), url('/assets/blog-bg.png') no-repeat center center / cover;
      margin-bottom: 5rem; 
      position: relative;
      border-bottom: 1px solid var(--border-light);
    }
    .blog-header h1 { font-size: 4rem; font-weight: 800; margin-bottom: 1rem; color: var(--text-deep); letter-spacing: -0.02em; }
    .blog-header p { color: var(--text-muted); font-size: 1.2rem; max-width: 600px; margin: 0 auto; line-height: 1.6; }
    .highlight { color: var(--primary-green); position: relative; }
    .highlight::after {
      content: ''; position: absolute; bottom: 8px; left: 0; width: 100%; height: 12px;
      background: rgba(59, 107, 75, 0.15); z-index: -1; border-radius: 4px;
    }

    .card { background: white; border-radius: 24px; border: 1px solid rgba(0,0,0,0.05); overflow: hidden; transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); box-shadow: 0 4px 20px rgba(0,0,0,0.03); }
    .card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }

    .featured-post { display: grid; grid-template-columns: 1.3fr 1fr; gap: 0; margin-bottom: 6rem; background: #fff; }
    .featured-image { position: relative; overflow: hidden; }
    .featured-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
    .featured-post:hover .featured-image img { transform: scale(1.05); }
    .featured-content { padding: 4rem; display: flex; flex-direction: column; justify-content: center; position: relative; }
    .category { display: inline-block; padding: 0.5rem 1.2rem; background: rgba(59, 107, 75, 0.08); color: var(--primary-green); border-radius: 30px; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 1.5rem; width: fit-content; }
    .featured-content h2 { font-size: 2.75rem; margin-bottom: 1.5rem; line-height: 1.15; font-weight: 700; color: var(--text-deep); letter-spacing: -0.01em; }
    .featured-content p { color: var(--text-muted); margin-bottom: 2.5rem; line-height: 1.7; font-size: 1.1rem; }
    .meta { display: flex; align-items: center; gap: 1rem; color: #888; font-size: 0.9rem; margin-bottom: 2.5rem; font-weight: 500; }
    .dot { width: 4px; height: 4px; background: #ccc; border-radius: 50%; }

    .blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 3rem; }
    .post-image { height: 260px; position: relative; overflow: hidden; }
    .post-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
    .blog-card:hover .post-image img { transform: scale(1.05); }
    .post-image .category { position: absolute; top: 1.5rem; right: 1.5rem; background: rgba(255,255,255,0.95); margin: 0; backdrop-filter: blur(4px); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .post-content { padding: 2.5rem; }
    .post-content .date { font-size: 0.85rem; color: #888; margin-bottom: 1rem; font-weight: 500; }
    .post-content h3 { font-size: 1.5rem; margin-bottom: 1rem; line-height: 1.4; color: var(--text-deep); font-weight: 700; }
    .post-content p { color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; margin-bottom: 2rem; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
    .read-more { color: var(--primary-green); font-weight: 700; font-size: 0.95rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 0.02em; }
    .read-more:hover { gap: 0.8rem; color: var(--text-deep); }

    .pagination { display: flex; justify-content: center; align-items: center; gap: 0.5rem; margin-top: 6rem; }
    .page-btn { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: white; border: 1px solid transparent; border-radius: 14px; color: var(--text-deep); font-weight: 600; font-size: 1rem; transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.02); }
    .page-btn.active { background: var(--primary-green); color: white; box-shadow: 0 4px 12px rgba(59, 107, 75, 0.3); }
    .page-btn:not(.active):not([disabled]):hover { border-color: var(--primary-green); color: var(--primary-green); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .page-btn[disabled] { opacity: 0.5; cursor: not-allowed; box-shadow: none; }
    .page-btn:first-child, .page-btn:last-child { width: auto; padding: 0 1.5rem; gap: 0.5rem; }

    @media (max-width: 991px) {
      .featured-post { grid-template-columns: 1fr; }
      .featured-content { padding: 3rem; }
      .blog-header h1 { font-size: 3rem; }
    }
  `]
})
export class BlogComponent implements OnInit {
  featuredPost: BlogPost | null = null;
  blogPosts: BlogPost[] = [];
  
  currentPage: number = 0;
  pageSize: number = 4;
  totalPages: number = 0;

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.loadPage(0);
  }

  loadPage(page: number): void {
    if (page < 0 || (this.totalPages > 0 && page >= this.totalPages)) {
      return;
    }
    
    this.blogService.getBlogsPaginated(page, this.pageSize).subscribe({
      next: (response) => {
        if (response && response.content.length > 0) {
          const posts = response.content;
          
          // Only show featured post on the first page
          if (page === 0) {
            this.featuredPost = posts[0];
            this.blogPosts = posts.slice(1);
          } else {
            this.featuredPost = null;
            this.blogPosts = posts;
          }
          
          this.currentPage = response.number;
          this.totalPages = response.totalPages;
          
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          this.loadFallbackData();
        }
      },
      error: (err) => {
        console.error('Failed to fetch paginated blogs from API:', err);
        this.loadFallbackData();
      }
    });
  }

  // Fallback to mock data in case the backend is not running or fails
  private loadFallbackData(): void {
    const fallbackData: BlogPost[] = [
      {
        id: 1,
        title: "Understanding Satvik Diet: The Key to Mental Clarity",
        excerpt: "The ancient wisdom of Ayurveda categorizes food into three gunas. Explore how a Satvik diet can transform your energy levels and focus.",
        category: "Wellness",
        date: "May 12, 2026",
        image: "/assets/blog-1.png",
        author: "Dr. Anjali Sharma"
      },
      {
        id: 2,
        title: "Handcrafted Traditions: Why Artisanal Still Matters",
        excerpt: "In a world of mass production, handcrafted items carry a soul. Discover the artisans keeping Indian heritage alive.",
        category: "Culture",
        date: "May 10, 2026",
        image: "/assets/blog-2.png",
        author: "Vikram Rai"
      },
      {
        id: 3,
        title: "The Art of Slow Living in a Fast-Paced World",
        excerpt: "Lessons from the Vedas on finding peace and presence in your daily routine without leaving your modern life.",
        category: "Lifestyle",
        date: "May 08, 2026",
        image: "/assets/blog-3.png",
        author: "Priya Das"
      },
      {
        id: 4,
        title: "Turmeric: More Than Just a Spice in Your Kitchen",
        excerpt: "Unlocking the bioactive compounds of India's golden spice and how to use it for maximum health benefits.",
        category: "Ayurveda",
        date: "May 05, 2026",
        image: "/assets/blog-4.png",
        author: "Dr. Anjali Sharma"
      }
    ];
    
    this.featuredPost = fallbackData[0];
    this.blogPosts = fallbackData.slice(1);
  }
}
