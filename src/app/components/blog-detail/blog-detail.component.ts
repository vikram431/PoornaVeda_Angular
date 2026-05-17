import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogService, BlogPost } from '../blog/blog.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="blog-detail-page" *ngIf="post">
      <header class="blog-hero">
        <div class="container">
          <span class="category">{{ post.category }}</span>
          <h1>{{ post.title }}</h1>
          <div class="meta">
            <span>By {{ post.author }}</span>
            <span class="dot"></span>
            <span>{{ post.date }}</span>
          </div>
        </div>
      </header>

      <div class="hero-image container">
        <img [src]="post.image" [alt]="post.title">
      </div>

      <main class="container article-content">
        <p class="excerpt">{{ post.excerpt }}</p>
        <div class="content" [innerHTML]="post.content || 'Content not available for this article.'"></div>
        
        <div class="back-link-container">
          <button routerLink="/blog" class="secondary-btn"><i class="fa-solid fa-arrow-left"></i> Back to Blog</button>
        </div>
      </main>
    </div>
    
    <div class="loading-state" *ngIf="!post">
      <p>Loading article...</p>
    </div>
  `,
  styles: [`
    .blog-detail-page { background: var(--bg-cream); padding-bottom: 8rem; font-family: 'Outfit', sans-serif; position: relative; }
    
    .blog-hero { 
      padding: 7rem 0 6rem; 
      text-align: center; 
      background: linear-gradient(rgba(255, 255, 255, 0.88), rgba(253, 251, 247, 0.92)), url('/assets/blog-bg.png') no-repeat center center / cover;
    }
    .category { display: inline-block; padding: 0.5rem 1.5rem; background: rgba(59, 107, 75, 0.08); color: var(--primary-green); border-radius: 30px; font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2rem; }
    .blog-hero h1 { font-size: 4.5rem; font-weight: 800; margin-bottom: 1.5rem; max-width: 1000px; margin-inline: auto; line-height: 1.15; color: var(--text-deep); letter-spacing: -0.02em; }
    .meta { display: flex; align-items: center; justify-content: center; gap: 1rem; color: #666; font-size: 1.1rem; font-weight: 500; }
    .dot { width: 5px; height: 5px; background: var(--primary-green); border-radius: 50%; opacity: 0.5; }
    
    .hero-image { margin-bottom: -10rem; position: relative; z-index: 1; }
    .hero-image img { width: 100%; height: 60vh; min-height: 400px; max-height: 700px; object-fit: cover; border-radius: 32px; box-shadow: 0 20px 50px rgba(0,0,0,0.15); border: 8px solid white; }
    
    .article-content { 
      max-width: 900px; 
      margin: 0 auto; 
      background: white; 
      padding: 5rem; 
      border-radius: 32px; 
      box-shadow: 0 10px 40px rgba(0,0,0,0.05); 
      position: relative; 
      z-index: 2; 
      margin-top: 15rem; /* Pulled up to overlap the image */
    }
    
    .excerpt { font-size: 1.5rem; line-height: 1.7; color: var(--primary-green); font-weight: 500; margin-bottom: 3rem; padding-bottom: 3rem; border-bottom: 2px solid rgba(59,107,75,0.1); font-style: italic; text-align: center; }
    .content { font-size: 1.15rem; line-height: 1.9; color: #444; }
    .content ::ng-deep h2 { font-size: 2rem; color: var(--text-deep); margin: 3rem 0 1.5rem; }
    .content ::ng-deep p { margin-bottom: 1.5rem; }
    .content ::ng-deep img { max-width: 100%; border-radius: 16px; margin: 2rem 0; }
    .content ::ng-deep blockquote { border-left: 4px solid var(--primary-green); padding-left: 1.5rem; margin: 2rem 0; font-style: italic; color: #666; }
    
    .back-link-container { margin-top: 5rem; padding-top: 3rem; border-top: 1px solid var(--border-light); display: flex; justify-content: center; }
    .secondary-btn { background: transparent; border: 2px solid var(--primary-green); color: var(--primary-green); padding: 1rem 2rem; border-radius: 50px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 0.75rem; transition: all 0.3s ease; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em; }
    .secondary-btn:hover { background: var(--primary-green); color: white; transform: translateY(-3px); box-shadow: 0 10px 20px rgba(59, 107, 75, 0.2); }
    
    .loading-state { height: 70vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 1.25rem; color: var(--primary-green); font-weight: 600; }
    .loading-state::after { content: ''; width: 40px; height: 40px; border: 4px solid rgba(59,107,75,0.2); border-top-color: var(--primary-green); border-radius: 50%; margin-top: 1rem; animation: spin 1s infinite linear; }
    @keyframes spin { to { transform: rotate(360deg); } }
    
    @media (max-width: 992px) {
      .blog-hero h1 { font-size: 3.5rem; }
      .article-content { margin-top: 10rem; padding: 4rem; }
    }
    @media (max-width: 768px) {
      .blog-hero { padding: 5rem 0 3rem; }
      .blog-hero h1 { font-size: 2.5rem; }
      .hero-image { margin-bottom: -5rem; }
      .hero-image img { border-radius: 20px; border-width: 4px; height: 40vh; min-height: 300px; }
      .article-content { margin-top: 5rem; padding: 2.5rem; border-radius: 20px; }
      .excerpt { font-size: 1.25rem; }
    }
  `]
})
export class BlogDetailComponent implements OnInit {
  post: BlogPost | null = null;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');
      if (idStr) {
        const id = parseInt(idStr, 10);
        this.loadPost(id);
      }
    });
  }

  loadPost(id: number): void {
    this.blogService.getBlogById(id).subscribe({
      next: (data) => {
        this.post = data;
      },
      error: (err) => {
        console.error('Failed to load blog post:', err);
      }
    });
  }
}
