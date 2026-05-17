import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProfileService, Order } from '../../services/profile.service';
import { cartService } from '../cart-sheet/cart-sheet.service';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="order-details-container" *ngIf="order">
      <nav class="breadcrumb">
        <button class="back-link" routerLink="/orders">
          <i class="fa-solid fa-arrow-left"></i> Back to Orders
        </button>
      </nav>

      <header class="order-header">
        <div class="header-main">
          <h1>Order #{{ order.id }}</h1>
          <span class="order-status" [ngClass]="order.status.toLowerCase()">{{ order.status }}</span>
          <button class="buy-again-btn" (click)="buyAgain()">Buy Again</button>
        </div>
        <div class="header-meta">
          <span>Placed on {{ order.date | date:'mediumDate' }}</span>
          <span class="divider">|</span>
          <span>{{ order.items.length }} Items</span>
        </div>
      </header>

      <div class="details-grid">
        <!-- Order Items -->
        <div class="items-section card">
          <h3>Order Items</h3>
          <div class="items-list">
            <div class="item-row" *ngFor="let item of order.items">
              <img [src]="item.imageUrl" [alt]="item.productName">
              <div class="item-info">
                <h4>{{ item.productName }}</h4>
                <p>Quantity: {{ item.quantity }}</p>
              </div>
              <div class="item-price">
                ₹{{ item.price * item.quantity }}
              </div>
            </div>
          </div>
        </div>

        <!-- Summary & Address -->
        <div class="sidebar">
          <div class="summary-card card">
            <h3>Payment Summary</h3>
            <div class="summary-row">
              <span>Subtotal</span>
              <span>₹{{ order.total - 99 }}</span>
            </div>
            <div class="summary-row">
              <span>Shipping</span>
              <span>₹99</span>
            </div>
            <div class="summary-row total">
              <span>Total</span>
              <span>₹{{ order.total }}</span>
            </div>
          </div>

          <div class="info-card card">
            <h3>Delivery & Contact</h3>
            <div class="info-section">
              <label>Shipping Method</label>
              <p>Standard Delivery (3-5 Business Days)</p>
            </div>
            <div class="info-section">
              <label>Contact Information</label>
              <p>{{ order.shippingAddress.phone }}</p>
              <p>vikram.rai&#64;poornaveda.com</p>
            </div>
          </div>

          <div class="address-card card">
            <h3>Shipping Address</h3>
            <div class="address-info">
              <p><strong>{{ order.shippingAddress.name }}</strong></p>
              <p>{{ order.shippingAddress.street }}</p>
              <p>{{ order.shippingAddress.city }}, {{ order.shippingAddress.state }}</p>
              <p>{{ order.shippingAddress.zipCode }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .order-details-container {
      max-width: 1100px;
      margin: 4rem auto;
      padding: 0 2rem;
      font-family: 'Outfit', sans-serif;
    }
    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.9rem;
      color: #707070;
      margin-bottom: 2rem;
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
      cursor: pointer;
      font-size: 0.95rem;
    }
    .back-link:hover {
      text-decoration: underline;
    }
    
    .order-header {
      margin-bottom: 3rem;
    }
    .header-main {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      margin-bottom: 0.5rem;
      flex-wrap: wrap;
    }
    .header-main h1 { font-size: 2.5rem; margin: 0; }
    .header-meta { color: #707070; display: flex; gap: 1rem; }
    
    .order-status {
      padding: 0.5rem 1.25rem;
      border-radius: 30px;
      font-weight: 600;
      font-size: 0.85rem;
    }
    .order-status.delivered { background: #e8f5e9; color: #2e7d32; }

    .buy-again-btn {
      padding: 0.75rem 1.5rem;
      background: #3b6b4b;
      color: #fff;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      margin-left: auto;
    }
    .buy-again-btn:hover { background: #2d5239; }

    .details-grid {
      display: grid;
      grid-template-columns: 1.8fr 1fr;
      gap: 2rem;
    }
    .card {
      background: #fff;
      border: 1px solid #e1e1e1;
      border-radius: 12px;
      padding: 2rem;
    }
    .card h3 {
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #f1f1f1;
    }
    
    .item-row {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 1rem 0;
      border-bottom: 1px solid #f9f9f9;
    }
    .item-row:last-child { border: none; }
    .item-row img { width: 80px; height: 80px; object-fit: cover; border-radius: 8px; }
    .item-info { flex: 1; }
    .item-info h4 { margin: 0 0 0.5rem; font-size: 1.1rem; }
    .item-info p { margin: 0; color: #707070; font-size: 0.9rem; }
    .item-price { font-weight: 600; font-size: 1.1rem; }
    
    .sidebar { display: flex; flex-direction: column; gap: 2rem; }
    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      color: #555;
    }
    .summary-row.total {
      border-top: 1px solid #f1f1f1;
      padding-top: 1rem;
      margin-top: 1rem;
      font-weight: 700;
      color: #1a1a1a;
      font-size: 1.25rem;
    }

    .info-section { margin-bottom: 1.5rem; }
    .info-section:last-child { margin-bottom: 0; }
    .info-section label { display: block; font-size: 0.75rem; color: #707070; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem; }
    .info-section p { margin: 0; color: #1a1a1a; font-weight: 500; }

    .address-info p { margin: 0.25rem 0; color: #555; }

    @media (max-width: 991px) {
      .details-grid { grid-template-columns: 1fr; }
      .buy-again-btn { margin-left: 0; width: 100%; margin-top: 1rem; }
    }
  `]
})
export class OrderDetailsComponent implements OnInit {
  order: Order | undefined;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private cartService: cartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.profileService.getOrderById(id).subscribe(data => {
        this.order = data;
      });
    }
  }

  buyAgain() {
    if (this.order) {
      this.cartService.buyAgain(this.order.items);
    }
  }
}
