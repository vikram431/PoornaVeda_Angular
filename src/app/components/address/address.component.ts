import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfileService, Address } from '../../services/profile.service';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="address-container">
      <header class="page-header">
        <button class="back-link" (click)="goBack()">
          <i class="fa-solid fa-arrow-left"></i> Back
        </button>
        <h1>My Addresses</h1>
        <p>Manage your shipping and billing locations</p>
        <button class="add-btn btn-primary" (click)="showForm = !showForm">
          {{ showForm ? 'Cancel' : '+ Add New Address' }}
        </button>
      </header>

      <!-- Add/Edit Form -->
      <div class="address-form-wrapper card" *ngIf="showForm">
        <h3>New Address</h3>
        <form [formGroup]="addressForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" formControlName="name" placeholder="Enter full name">
          </div>
          <div class="form-group">
            <label>Street Address</label>
            <input type="text" formControlName="street" placeholder="Gali, Building, Area">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>City</label>
              <input type="text" formControlName="city" placeholder="City">
            </div>
            <div class="form-group">
              <label>State</label>
              <input type="text" formControlName="state" placeholder="State">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>ZIP Code</label>
              <input type="text" formControlName="zipCode" placeholder="6-digit ZIP">
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input type="tel" formControlName="phone" placeholder="10-digit mobile">
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="save-btn btn-primary" [disabled]="addressForm.invalid">Save Address</button>
          </div>
        </form>
      </div>

      <!-- Address List -->
      <div class="address-grid">
        <div class="address-card card" [class.active]="addr.isDefault" *ngFor="let addr of addresses">
          <div class="card-header">
            <span class="default-badge" *ngIf="addr.isDefault">DEFAULT</span>
            <span *ngIf="!addr.isDefault"></span>
            <div class="actions">
              <button class="icon-btn" (click)="deleteAddress(addr.id)"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          </div>
          <div class="address-details">
            <h4>{{ addr.name }}</h4>
            <p>{{ addr.street }}</p>
            <p>{{ addr.city }}, {{ addr.state }}</p>
            <p>{{ addr.zipCode }}</p>
            <p class="phone">Phone: {{ addr.phone }}</p>
          </div>
          <!-- Set Default Footer Button -->
          <div class="card-footer" *ngIf="!addr.isDefault">
            <button class="set-default-btn" (click)="setDefault(addr)">
              <i class="fa-regular fa-star"></i> Set as Default
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .address-container {
      max-width: 900px;
      margin: 4rem auto;
      padding: 0 2rem;
      font-family: 'Outfit', sans-serif;
    }
    .page-header {
      display: flex;
      flex-direction: column;
      margin-bottom: 3rem;
      position: relative;
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
    .page-header h1 { font-size: 2.25rem; margin-bottom: 0.5rem; }
    .page-header p { color: #707070; margin-bottom: 1.5rem; }
    .add-btn { align-self: flex-start; }
 
    .card {
      background: #fff;
      border: 1px solid #e1e1e1;
      border-radius: 12px;
      padding: 2rem;
      transition: all 0.25s ease-in-out;
    }
    
    .address-form-wrapper { margin-bottom: 3rem; }
    .address-form-wrapper h3 { margin-bottom: 2rem; font-size: 1.25rem; }
    
    .form-group { margin-bottom: 1.5rem; }
    .form-group label { display: block; font-size: 0.85rem; font-weight: 500; margin-bottom: 0.5rem; color: #555; }
    .form-group input { 
      width: 100%; padding: 0.75rem 1rem; border: 1.5px solid #e1e1e1; 
      border-radius: 8px; font-size: 1rem; transition: all 0.2s;
    }
    .form-group input:focus { border-color: #3b6b4b; outline: none; }
    .form-row { display: flex; gap: 1rem; }
    .form-row .form-group { flex: 1; }
 
    .address-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    .address-card { position: relative; }
    .address-card.active {
      border-color: #3b6b4b;
      background: #fdfdfb;
      box-shadow: 0 4px 16px rgba(59, 107, 75, 0.08);
    }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
    .default-badge {
      background: #e8f5e9; color: #2e7d32; font-size: 0.65rem; font-weight: 700;
      padding: 0.25rem 0.6rem; border-radius: 4px;
    }
    .icon-btn { background: none; border: none; color: #ff4d4f; cursor: pointer; font-size: 1rem; }
    .address-details h4 { margin: 0 0 0.75rem; font-size: 1.1rem; }
    .address-details p { margin: 0.25rem 0; color: #707070; font-size: 0.95rem; }
    .phone { margin-top: 0.75rem !important; color: #1a1a1a !important; font-weight: 500; }
    
    .card-footer {
      margin-top: 1.5rem;
      border-top: 1px dashed #e1e1e1;
      padding-top: 1rem;
      display: flex;
      justify-content: flex-end;
    }
    .set-default-btn {
      background: none;
      border: 1px solid #ebdcc5;
      border-radius: 6px;
      color: #3b6b4b;
      font-size: 0.8125rem;
      font-weight: 600;
      padding: 0.4rem 0.8rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.35rem;
      transition: all 0.2s ease;
    }
    .set-default-btn:hover {
      background: #3b6b4b;
      color: #ffffff;
      border-color: #3b6b4b;
    }
  `]
})
export class AddressComponent implements OnInit {
  addresses: Address[] = [];
  addressForm!: FormGroup;
  showForm = false;
 
  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    private location: Location
  ) {
    this.initForm();
  }
 
  goBack() {
    this.location.back();
  }
 
  ngOnInit(): void {
    this.loadAddresses();
  }
 
  private initForm() {
    this.addressForm = this.fb.group({
      name: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      isDefault: [false]
    });
  }
 
  loadAddresses() {
    this.profileService.getAddresses().subscribe(data => {
      this.addresses = data;
    });
  }

  setDefault(addr: Address) {
    const updated = { ...addr, isDefault: true };
    this.profileService.addAddress(updated).subscribe(() => {
      this.loadAddresses();
    });
  }
 
  onSubmit() {
    if (this.addressForm.valid) {
      this.profileService.addAddress(this.addressForm.value).subscribe(() => {
        this.loadAddresses();
        this.addressForm.reset();
        this.showForm = false;
      });
    }
  }
 
  deleteAddress(id: string) {
    if (confirm('Are you sure you want to delete this address?')) {
      this.profileService.deleteAddress(id).subscribe(() => {
        this.loadAddresses();
      });
    }
  }
}
