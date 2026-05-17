import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { cartService, CartItem } from '../cart-sheet/cart-sheet.service';
import { ProfileService, Address } from '../../services/profile.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  cartItems: CartItem[] = [];
  savedAddresses: Address[] = [];
  selectedAddress: Address | null = null;
  isLoggedIn = false;
  subtotal = 0;
  shipping = 0;
  total = 0;

  constructor(
    private fb: FormBuilder,
    private cartService: cartService,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
      if (items.length === 0) {
        this.router.navigate(['/products']);
      }
    });

    // Prefill email and check login status
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;

    const email = localStorage.getItem('emailId');
    if (email) {
      this.checkoutForm.patchValue({ email });
    }

    // Load user's saved addresses
    this.profileService.getAddresses().subscribe(addresses => {
      this.savedAddresses = addresses;
      if (addresses.length > 0) {
        const defaultAddr = addresses.find(a => a.isDefault) || addresses[0];
        this.selectedAddress = defaultAddr;
        this.selectSavedAddress(defaultAddr);
      } else {
        this.selectedAddress = null;
      }
    });
  }

  selectSavedAddress(addr: Address) {
    const nameParts = addr.name.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const streetParts = addr.street.split(', ');
    const addressLine1 = streetParts[0] || '';
    const apartment = streetParts.slice(1).join(', ') || '';

    this.checkoutForm.patchValue({
      firstName: firstName,
      lastName: lastName,
      address: addressLine1,
      apartment: apartment,
      city: addr.city,
      state: addr.state,
      zipCode: addr.zipCode,
      phone: addr.phone
    });
  }

  onShippingAddressChange(event: Event) {
    const selectEl = event.target as HTMLSelectElement;
    const selectedId = selectEl.value;
    
    if (selectedId === 'new') {
      this.selectedAddress = null;
      this.checkoutForm.patchValue({
        firstName: '',
        lastName: '',
        address: '',
        apartment: '',
        city: '',
        state: '',
        zipCode: '',
        phone: ''
      });
    } else {
      const addr = this.savedAddresses.find(a => a.id === selectedId);
      if (addr) {
        this.selectedAddress = addr;
        this.selectSavedAddress(addr);
      }
    }
  }

  onBillingSameChange(same: boolean) {
    this.checkoutForm.patchValue({ billingSameAsShipping: same });
    const billingFields = ['billingFirstName', 'billingLastName', 'billingAddress', 'billingCity', 'billingState', 'billingZipCode', 'billingPhone'];
    billingFields.forEach(f => {
      const control = this.checkoutForm.get(f);
      if (control) {
        if (same) {
          control.clearValidators();
        } else {
          control.setValidators(Validators.required);
        }
        control.updateValueAndValidity();
      }
    });
  }

  private initForm() {
    this.checkoutForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      apartment: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      phone: ['', Validators.required],
      shippingMethod: ['standard', Validators.required],
      
      // Billing Address fields
      billingSameAsShipping: [true],
      billingFirstName: [''],
      billingLastName: [''],
      billingAddress: [''],
      billingApartment: [''],
      billingCity: [''],
      billingState: [''],
      billingZipCode: [''],
      billingPhone: ['']
    });
  }

  private calculateTotals() {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.shipping = this.subtotal > 1000 ? 0 : 99;
    this.total = this.subtotal + this.shipping;
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      console.log('Checkout Form Data:', this.checkoutForm.value);

      // If we are using a manually entered shipping address, save it to the database
      if (!this.selectedAddress) {
        const formVal = this.checkoutForm.value;
        const addressToSave = {
          id: '',
          name: `${formVal.firstName} ${formVal.lastName}`.trim(),
          street: formVal.address + (formVal.apartment ? `, ${formVal.apartment}` : ''),
          city: formVal.city,
          state: formVal.state,
          zipCode: formVal.zipCode,
          phone: formVal.phone,
          isDefault: this.savedAddresses.length === 0
        };

        // Save new user address to the backend before navigating
        this.profileService.addAddress(addressToSave).subscribe({
          next: (savedAddress) => {
            console.log('New address saved successfully:', savedAddress);
            this.router.navigate(['/payment']);
          },
          error: (err) => {
            console.error('Error saving new address:', err);
            // Navigate to payment anyway to ensure checkout flow is never blocked
            this.router.navigate(['/payment']);
          }
        });
      } else {
        console.log('Using existing saved address, proceeding directly to payment.');
        this.router.navigate(['/payment']);
      }
    } else {
      this.markFormGroupTouched(this.checkoutForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}
