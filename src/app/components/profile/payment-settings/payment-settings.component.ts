import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-payment-settings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="payment-settings">
      <header class="section-header">
        <button class="back-link" (click)="goBack()">
          <i class="fa-solid fa-arrow-left"></i> Back
        </button>
        <h1>Payment Methods</h1>
        <p>Manage your saved cards and digital wallets</p>
      </header>

      <div class="settings-grid">
        <!-- Saved Cards -->
        <section class="settings-card card">
          <div class="card-title">
            <h3>Saved Cards</h3>
            <button class="add-btn"><i class="fa-solid fa-plus"></i> Add New Card</button>
          </div>
          
          <div class="cards-list">
            <div class="saved-card-item">
              <div class="card-brand">
                <i class="fa-brands fa-cc-visa"></i>
              </div>
              <div class="card-info">
                <p class="card-number">•••• •••• •••• 4242</p>
                <p class="card-expiry">Expires 12/28</p>
              </div>
              <div class="card-tag default">Default</div>
              <button class="remove-btn"><i class="fa-solid fa-trash-can"></i></button>
            </div>

            <div class="saved-card-item">
              <div class="card-brand">
                <i class="fa-brands fa-cc-mastercard"></i>
              </div>
              <div class="card-info">
                <p class="card-number">•••• •••• •••• 8888</p>
                <p class="card-expiry">Expires 05/27</p>
              </div>
              <button class="remove-btn"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          </div>
        </section>

        <!-- Other Methods -->
        <section class="settings-card card">
          <div class="card-title">
            <h3>UPI & Wallets</h3>
          </div>
          <div class="upi-list">
            <div class="upi-item">
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" style="width: 50px;">
              <span class="upi-id">vikram.rai&#64;okaxis</span>
              <div class="card-tag">Verified</div>
              <button class="remove-btn"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          </div>
        </section>

        <!-- Payment History (Recent Transactions) -->
        <section class="settings-card card full-width">
          <div class="card-title">
            <h3>Recent Transactions</h3>
          </div>
          <div class="transaction-table-wrapper">
            <table class="transaction-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Method</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let tx of transactions">
                  <td>#{{ tx.orderId }}</td>
                  <td>{{ tx.date }}</td>
                  <td>{{ tx.method }}</td>
                  <td>₹{{ tx.amount }}</td>
                  <td><span class="status-badge" [ngClass]="tx.status.toLowerCase()">{{ tx.status }}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .payment-settings { max-width: 900px; margin: 4rem auto; padding: 0 2rem; font-family: 'Outfit', sans-serif; }
    .section-header { margin-bottom: 3rem; }
    .back-link { display: flex; align-items: center; gap: 0.5rem; background: none; border: none; color: var(--primary-green); font-weight: 600; padding: 0; margin-bottom: 1.5rem; cursor: pointer; font-size: 0.95rem; }
    .back-link:hover { text-decoration: underline; }
    .section-header h1 { font-size: 2.25rem; margin-bottom: 0.5rem; }
    .section-header p { color: var(--text-muted); }

    .settings-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
    .full-width { grid-column: span 2; }
    .card { background: white; border-radius: 20px; border: 1px solid var(--border-light); padding: 2rem; }
    .card-title { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .card-title h3 { font-size: 1.15rem; margin: 0; }
    
    .add-btn { background: none; border: 1px solid var(--primary-green); color: var(--primary-green); padding: 0.5rem 1rem; border-radius: 8px; font-size: 0.85rem; }
    .add-btn:hover { background: var(--primary-green); color: white; }

    .saved-card-item { display: flex; align-items: center; gap: 1.5rem; padding: 1.25rem; border: 1px solid #f0f0f0; border-radius: 12px; margin-bottom: 1rem; }
    .card-brand i { font-size: 2rem; color: #555; }
    .card-info { flex: 1; }
    .card-number { font-weight: 600; margin: 0; }
    .card-expiry { font-size: 0.8rem; color: #888; margin: 0.2rem 0 0; }
    .card-tag { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; padding: 0.2rem 0.6rem; border-radius: 4px; background: #f0f0f0; color: #666; }
    .card-tag.default { background: #e8f5e9; color: #2e7d32; }
    .remove-btn { background: none; border: none; color: #ff4d4f; cursor: pointer; opacity: 0.6; transition: 0.2s; }
    .remove-btn:hover { opacity: 1; }

    .upi-item { display: flex; align-items: center; gap: 1.5rem; padding: 1.25rem; border: 1px solid #f0f0f0; border-radius: 12px; }
    .upi-id { flex: 1; font-weight: 500; }

    .transaction-table-wrapper { overflow-x: auto; }
    .transaction-table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    .transaction-table th { text-align: left; padding: 1rem; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; }
    .transaction-table td { padding: 1.25rem 1rem; border-bottom: 1px solid #f9f9f9; font-size: 0.95rem; }
    .status-badge { padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600; }
    .status-badge.success { background: #e8f5e9; color: #2e7d32; }
    .status-badge.refunded { background: #e3f2fd; color: #1565c0; }

    @media (max-width: 991px) {
      .settings-grid { grid-template-columns: 1fr; }
      .full-width { grid-column: span 1; }
    }
  `]
})
export class PaymentSettingsComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }

  transactions = [
    { orderId: 'PV-12543', date: 'May 12, 2026', method: 'Visa (•••• 4242)', amount: '1,499', status: 'Success' },
    { orderId: 'PV-12498', date: 'May 05, 2026', method: 'UPI (vikram.rai&#64;okaxis)', amount: '899', status: 'Success' },
    { orderId: 'PV-12355', date: 'Apr 28, 2026', method: 'Mastercard (•••• 8888)', amount: '2,200', status: 'Refunded' }
  ];
}
