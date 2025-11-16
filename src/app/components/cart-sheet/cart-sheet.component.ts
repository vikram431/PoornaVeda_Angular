import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CartItem {
  id: string;
  product_name: string;
  product_image: string | null;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-cart-sheet',
  imports:[CommonModule],
  templateUrl: './cart-sheet.component.html',
  styleUrls: ['./cart-sheet.component.css']
})
export class CartSheetComponent implements OnChanges {
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  @Input() session: any | null = null;

  cartItems: CartItem[] = [];
  loading = false;

  ngOnChanges(): void {
    if (this.open && this.session) {
      this.loadCartItems();
    }
  }

  closeSheet() {
    this.openChange.emit(false);
  }

  async loadCartItems() {
    this.loading = true;

    // 👉 REPLACE with real API call
    setTimeout(() => {
      this.cartItems = [
        {
          id: '1',
          product_name: 'Sample Product',
          product_image: null,
          price: 199,
          quantity: 1
        }
      ];
      this.loading = false;
    }, 500);
  }

  updateQuantity(id: string, qty: number) {
    if (qty < 1) return;

    const item = this.cartItems.find(i => i.id === id);
    if (!item) return;

    item.quantity = qty;
  }

  removeItem(id: string) {
    this.cartItems = this.cartItems.filter(i => i.id !== id);
  }

  get total() {
    return this.cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  }
}
