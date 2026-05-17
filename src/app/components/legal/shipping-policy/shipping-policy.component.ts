import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LEGAL_DATA } from '../../../mock-data/legal-data';

@Component({
  selector: 'app-shipping-policy',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="legal-container">
      <button class="back-link" *ngIf="isFromCheckout" [routerLink]="['/checkout']">
        <i class="fa-solid fa-arrow-left"></i> Back to Checkout
      </button>
      <div class="legal-header">
        <h1>{{ data.title }}</h1>
      </div>
      <div class="legal-content" [innerHTML]="formattedContent"></div>
    </div>
  `,
  styles: [`
    .legal-container {
      max-width: 800px;
      margin: 4rem auto;
      padding: 0 2rem;
      font-family: 'Outfit', sans-serif;
      line-height: 1.8;
      color: #333;
    }
    .back-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: none;
      border: none;
      color: #3b6b4b;
      font-weight: 600;
      padding: 0;
      margin-bottom: 2rem;
      cursor: pointer;
      font-size: 0.95rem;
    }
    .back-link:hover { text-decoration: underline; }
    .legal-header {
      margin-bottom: 3rem;
      text-align: center;
    }
    .legal-header h1 {
      font-size: 2.5rem;
      color: #1a1a1a;
    }
    .legal-content {
      background: #fff;
      padding: 2rem;
      border-radius: 12px;
    }
    ::ng-deep .legal-content h3 {
      font-size: 1.25rem;
      margin: 2rem 0 1rem;
      color: #1a1a1a;
    }
    ::ng-deep .legal-content p {
      margin-bottom: 1.5rem;
    }
    ::ng-deep .legal-content ul {
      margin-bottom: 1.5rem;
      padding-left: 1.5rem;
    }
    ::ng-deep .legal-content li {
      margin-bottom: 0.5rem;
    }
    ::ng-deep .legal-content strong {
      color: #3b6b4b;
    }
  `]
})
export class ShippingPolicyComponent {
  data = LEGAL_DATA.shippingPolicy;
  isFromCheckout = false;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.isFromCheckout = params['from'] === 'checkout';
    });
  }

  get formattedContent() {
    return this.data.content
      .replace(/### (.*)/g, '<h3>$1</h3>')
      .replace(/\* \*\*(.*?)\*\*/g, '<li><strong>$1</strong>')
      .replace(/\* (.*)/g, '<li>$1</li>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^/, '<p>')
      .replace(/$/, '</p>');
  }
}
