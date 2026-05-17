import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileService, Order } from '../../services/profile.service';
import { cartService } from '../cart-sheet/cart-sheet.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="orders-container">
      <header class="page-header">
        <button class="back-link" (click)="goBack()">
          <i class="fa-solid fa-arrow-left"></i> Back
        </button>
        <h1>My Orders</h1>
        <p>Track and manage your traditional treasures</p>
      </header>

      <div class="orders-list" *ngIf="orders.length > 0; else noOrders">
        <div class="order-card" *ngFor="let order of orders" [routerLink]="['/order-details', order.id]">
          <div class="order-header">
            <div class="order-id">
              <span class="label">ORDER ID</span>
              <span class="val">#{{ order.id }}</span>
            </div>
            <div class="order-date">
              <span class="label">PLACED ON</span>
              <span class="val">{{ order.date | date:'mediumDate' }}</span>
            </div>
            <div class="order-status" [ngClass]="order.status.toLowerCase()">
              {{ order.status }}
            </div>
          </div>
          
          <div class="order-items-preview">
            <div class="item-images">
              <img *ngFor="let item of order.items | slice:0:3" [src]="item.imageUrl" [alt]="item.productName">
              <div class="more-items" *ngIf="order.items.length > 3">
                +{{ order.items.length - 3 }} more
              </div>
            </div>
            <div class="order-total">
              <span class="label">TOTAL</span>
              <span class="val">₹{{ order.total }}</span>
            </div>
          </div>
          
          <div class="order-footer">
            <button class="view-btn">View Details</button>
            <button class="buy-again-btn" (click)="$event.stopPropagation(); buyAgain(order.items)">Buy Again</button>
            <button class="track-btn" *ngIf="order.status === 'Shipped'">Track Shipment</button>
          </div>
        </div>
      </div>

      <ng-template #noOrders>
        <div class="empty-state">
          <i class="fa-solid fa-box-open"></i>
          <h2>No orders yet</h2>
          <p>Your order history is currently empty. Start exploring our collections!</p>
          <button routerLink="/products" class="btn-primary">Shop Now</button>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .orders-container {
      max-width: 900px;
      margin: 4rem auto;
      padding: 0 2rem;
      font-family: 'Outfit', sans-serif;
    }
    .page-header {
      margin-bottom: 3rem;
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
      margin-bottom: 1.5rem;
      cursor: pointer;
      font-size: 0.95rem;
    }
    .back-link:hover {
      text-decoration: underline;
    }
    .page-header h1 {
      font-size: 2.25rem;
      color: #1a1a1a;
      margin-bottom: 0.5rem;
    }
    .page-header p {
      color: #707070;
    }
    .orders-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .order-card {
      background: #fff;
      border: 1px solid #e1e1e1;
      border-radius: 12px;
      padding: 1.5rem;
      cursor: pointer;
      transition: all 0.3s;
    }
    .order-card:hover {
      box-shadow: 0 10px 30px rgba(0,0,0,0.05);
      border-color: #3b6b4b;
    }
    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #f1f1f1;
      margin-bottom: 1.5rem;
    }
    .label {
      display: block;
      font-size: 0.7rem;
      color: #707070;
      letter-spacing: 1px;
      margin-bottom: 0.25rem;
    }
    .val {
      font-weight: 600;
      color: #1a1a1a;
    }
    .order-status {
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }
    .order-status.delivered { background: #e8f5e9; color: #2e7d32; }
    .order-status.pending { background: #fff3e0; color: #ef6c00; }
    .order-status.shipped { background: #e3f2fd; color: #1565c0; }
    
    .order-items-preview {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .item-images {
      display: flex;
      gap: 0.75rem;
    }
    .item-images img {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 8px;
      border: 1px solid #f1f1f1;
    }
    .more-items {
      width: 60px;
      height: 60px;
      background: #f8f8f8;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      color: #707070;
    }
    .order-footer {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #f1f1f1;
      display: flex;
      gap: 1rem;
    }
    .view-btn, .buy-again-btn {
      padding: 0.75rem 1.5rem;
      background: none;
      border: 1px solid #3b6b4b;
      color: #3b6b4b;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .buy-again-btn {
      background: #3b6b4b;
      color: #fff;
    }
    .buy-again-btn:hover {
      background: #2d5239;
    }
    .view-btn:hover {
      background: rgba(59, 107, 75, 0.05);
    }
    .empty-state {
      text-align: center;
      padding: 4rem 0;
    }
    .empty-state i {
      font-size: 4rem;
      color: #e1e1e1;
      margin-bottom: 2rem;
    }
  `]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private profileService: ProfileService,
    private cartService: cartService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.profileService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }

  buyAgain(items: any[]) {
    this.cartService.buyAgain(items);
  }

  goBack() {
    this.location.back();
  }
}
