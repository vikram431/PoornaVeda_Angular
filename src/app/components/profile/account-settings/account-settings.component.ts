import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="account-settings">
      <header class="section-header">
        <button class="back-link" (click)="goBack()">
          <i class="fa-solid fa-arrow-left"></i> Back
        </button>
        <h1>Account Settings</h1>
        <p>Manage your account preferences and security</p>
      </header>

      <div class="settings-content">
        <!-- Communication Preferences -->
        <section class="settings-card card">
          <h3>Notifications</h3>
          <p class="description">Control how you receive updates and offers.</p>
          
          <div class="pref-list">
            <div class="pref-item">
              <div class="pref-info">
                <strong>Email Notifications</strong>
                <p>Receive order updates and monthly newsletters.</p>
              </div>
              <label class="switch">
                <input type="checkbox" checked>
                <span class="slider round"></span>
              </label>
            </div>

            <div class="pref-item">
              <div class="pref-info">
                <strong>SMS Alerts</strong>
                <p>Real-time shipping and delivery updates.</p>
              </div>
              <label class="switch">
                <input type="checkbox" checked>
                <span class="slider round"></span>
              </label>
            </div>

            <div class="pref-item">
              <div class="pref-info">
                <strong>Marketing Promos</strong>
                <p>Occasional offers and seasonal discounts.</p>
              </div>
              <label class="switch">
                <input type="checkbox">
                <span class="slider round"></span>
              </label>
            </div>
          </div>
        </section>

        <!-- Region & Language -->
        <section class="settings-card card">
          <h3>Language & Region</h3>
          <div class="form-grid">
            <div class="form-group">
              <label>Preferred Language</label>
              <select class="custom-select">
                <option selected>English</option>
                <option>Hindi (हिन्दी)</option>
                <option>Sanskrit (संस्कृतम्)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Currency</label>
              <select class="custom-select">
                <option selected>INR (₹)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
              </select>
            </div>
          </div>
        </section>

        <!-- Danger Zone -->
        <section class="settings-card card danger-zone">
          <h3>Deactivate Account</h3>
          <p class="description">Temporarily disable your account. You can reactivate it anytime by logging in.</p>
          <button class="deactivate-btn">Deactivate Account</button>

          <div class="delete-section">
            <h4>Delete Account</h4>
            <p>Permanently delete your account and all associated data. This action is irreversible.</p>
            <button class="delete-btn">Delete Account permanently</button>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .account-settings { max-width: 800px; margin: 4rem auto; padding: 0 2rem; font-family: 'Outfit', sans-serif; }
    .section-header { margin-bottom: 3rem; }
    .back-link { display: flex; align-items: center; gap: 0.5rem; background: none; border: none; color: var(--primary-green); font-weight: 600; padding: 0; margin-bottom: 1.5rem; cursor: pointer; font-size: 0.95rem; }
    .back-link:hover { text-decoration: underline; }
    .section-header h1 { font-size: 2.25rem; margin-bottom: 0.5rem; }
    .section-header p { color: var(--text-muted); }

    .settings-content { display: flex; flex-direction: column; gap: 2.5rem; }
    .card { background: white; border-radius: 20px; border: 1px solid var(--border-light); padding: 2.5rem; }
    .card h3 { font-size: 1.25rem; margin-bottom: 0.5rem; color: var(--text-deep); }
    .description { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 2rem; }

    .pref-list { display: flex; flex-direction: column; gap: 1.5rem; }
    .pref-item { display: flex; justify-content: space-between; align-items: center; padding-bottom: 1rem; border-bottom: 1px solid #f9f9f9; }
    .pref-item:last-child { border: none; }
    .pref-info strong { display: block; font-size: 1rem; margin-bottom: 0.25rem; }
    .pref-info p { margin: 0; color: #888; font-size: 0.85rem; }

    /* Switch Component */
    .switch { position: relative; display: inline-block; width: 46px; height: 24px; }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #eee; transition: .4s; }
    .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; }
    input:checked + .slider { background-color: var(--primary-green); }
    input:checked + .slider:before { transform: translateX(22px); }
    .slider.round { border-radius: 34px; }
    .slider.round:before { border-radius: 50%; }

    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    .form-group label { display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.5rem; color: #555; }
    .custom-select { width: 100%; height: 50px; padding: 0 1rem; border: 1px solid var(--border-light); border-radius: 10px; background: #fdfbf7; font-size: 1rem; cursor: pointer; appearance: none; }

    .danger-zone { border-color: #ffeaea; }
    .danger-zone h3 { color: #d32f2f; }
    .deactivate-btn { background: #f5f5f5; color: #333; border: 1px solid #ddd; padding: 0.75rem 1.5rem; font-weight: 600; font-size: 0.9rem; }
    .delete-section { margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #ffeaea; }
    .delete-section h4 { color: #d32f2f; margin-bottom: 0.5rem; }
    .delete-btn { background: #fff1f0; color: #d32f2f; border: 1px solid #ffa39e; padding: 0.75rem 1.5rem; font-weight: 600; font-size: 0.9rem; }
    .delete-btn:hover { background: #d32f2f; color: white; border-color: #d32f2f; }

    @media (max-width: 640px) {
      .form-grid { grid-template-columns: 1fr; }
      .account-settings { padding: 0 1rem; }
    }
  `]
})
export class AccountSettingsComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
