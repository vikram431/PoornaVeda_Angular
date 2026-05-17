import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { cartService, CartItem } from '../cart-sheet/cart-sheet.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm!: FormGroup;
  cartItems: CartItem[] = [];
  selectedMethod: 'card' | 'upi' | 'cod' = 'card';
  isProcessing = false;
  orderComplete = false;
  orderNumber = '';

  constructor(
    private fb: FormBuilder,
    private cartService: cartService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.initForm();
    this.generateOrderNumber();
  }

  private generateOrderNumber() {
    this.orderNumber = 'PV-' + Math.floor(100000 + Math.random() * 900000);
  }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      if (items.length === 0 && !this.orderComplete) {
        this.router.navigate(['/products']);
      }
    });
  }

  private initForm() {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      cardHolder: ['', Validators.required],
      expiry: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{2})$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
      upiId: ['', Validators.email] // Rough validation for UPI ID
    });
  }

  setPaymentMethod(method: 'card' | 'upi' | 'cod') {
    this.selectedMethod = method;
  }

  get totalAmount(): number {
    const subtotal = this.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const shipping = subtotal > 1000 ? 0 : 99;
    return subtotal + shipping;
  }

  confirmPayment() {
    if (this.selectedMethod === 'card') {
      const cardControls = ['cardNumber', 'cardHolder', 'expiry', 'cvv'];
      let isCardValid = true;
      cardControls.forEach(ctrlName => {
        const ctrl = this.paymentForm.get(ctrlName);
        if (ctrl) {
          ctrl.markAsTouched();
          if (ctrl.invalid) {
            isCardValid = false;
          }
        }
      });
      if (!isCardValid) {
        this.toastService.error("Please fill in valid Card details.");
        return;
      }
    } else if (this.selectedMethod === 'upi') {
      const upiCtrl = this.paymentForm.get('upiId');
      if (upiCtrl) {
        upiCtrl.markAsTouched();
        upiCtrl.setValidators([Validators.required, Validators.pattern('^[a-zA-Z0-9.\\-_]+@[a-zA-Z]+$')]);
        upiCtrl.updateValueAndValidity();
        if (upiCtrl.invalid) {
          this.toastService.error("Please enter a valid UPI ID (e.g. user@okaxis).");
          return;
        }
      }
    }

    this.isProcessing = true;
    
    // Map cartItems to OrderItemRequest payload
    const orderItemsPayload = this.cartItems.map(item => ({
      id: item.id ? Number(item.id) : null,
      cartId: item.cartId && item.cartId !== '' ? Number(item.cartId) : null,
      cartItemId: item.cartItemId && item.cartItemId !== '' ? Number(item.cartItemId) : null,
      quantity: Number(item.quantity) || 1,
      price: Number(item.price) || 0,
      productName: item.productName || '',
      imageUrl: item.imageUrl || ''
    }));

    console.log('Sending Order Items Payload to Backend:', orderItemsPayload);

    // Call API to save order
    this.cartService.saveOrderItems(orderItemsPayload).subscribe({
      next: (res) => {
        this.isProcessing = false;
        this.orderComplete = true;
        this.toastService.success("Payment Successful! Your order has been placed.");
        this.cartService.clearCartLocal(); 
      },
      error: (err) => {
        this.isProcessing = false;
        this.toastService.error("Payment failed. Please try again.");
        console.error('Error saving order items:', err);
      }
    });
  }

  returnToShop() {
    this.router.navigate(['/']);
  }
}