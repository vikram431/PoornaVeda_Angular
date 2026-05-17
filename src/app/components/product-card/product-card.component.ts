import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cartService } from '../cart-sheet/cart-sheet.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

interface Products {
  id: any;
  productName: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() products!: Products;
  inCart = false;
  quantity = 1;

  constructor(
    private cartService: cartService, 
    private router: Router,
    private toastService: ToastService
  ) {
  }


  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      if (!this.products) return;
      
      const cartItem = items.find(i => i.id === this.products.id);

      if (cartItem) {
        this.inCart = true;
        this.quantity = cartItem.quantity;
      } else {
        this.inCart = false;
        // Don't reset quantity to 1 if user was playing with it
        // but if it was synced and then removed, maybe reset
      }
    });
  }


  addToCart(): void {
    this.cartService.addToCart(this.products, this.quantity);
  }

  onProductClick(): void {
    this.router.navigate(['/products', this.products.id]);
  }

  incrementQuantity(event: Event) {
    event.stopPropagation();
    
    if (this.quantity >= this.products.quantity) {
      // this.products.quantity is the stock limit
      this.toastService.info(`Only ${this.products.quantity} units available in stock.`);
      return;
    }

    this.quantity++;
    if (this.inCart) {
      this.cartService.updateQuantity(this.products.id, this.quantity);
    }
  }

  decrementQuantity(event: Event) {
    event.stopPropagation();
    if (this.quantity > 1) {
      this.quantity--;
      if (this.inCart) {
        this.cartService.updateQuantity(this.products.id, this.quantity);
      }
    }
  }

  updateQuantity(id: string, qty: number) {
    this.cartService.updateQuantity(id, qty);
  }
}
