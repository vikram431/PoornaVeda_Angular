import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cartService } from '../cart-sheet/cart-sheet.service';
import { Router } from '@angular/router';




interface Products {
  Id: string;
  ProductName: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
  stockQuantity: number;
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
  
  cartItems: any[] = [];
  constructor(private cartService: cartService, private router: Router) {
  }


  ngOnInit() {

    this.cartService.cartItems$.subscribe(items => {
    
     this.cartItems=items;
    const cartItem = items.find(i => i.Id === this.products.Id);

    if (cartItem) {
      this.inCart = true;
      this.products.quantity = cartItem.quantity;
    } else {
      this.inCart = false;
      this.products.quantity = 0;
    }

  });

  }


  addToCart(): void {
    this.cartService.addToCart(this.products);
  }

  onProductClick(): void {
    this.router.navigate(['/products', this.products.Id]);
  }


  updateQuantity(id: string, qty: number) {
    console.log('quantity updating')

    this.cartService.updateQuantity(id, qty);
  }

}
