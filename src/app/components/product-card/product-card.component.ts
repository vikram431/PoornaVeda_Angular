import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cartService } from '../cart-sheet/cart-sheet.service';



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
  constructor(private cartService: cartService) {
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
    // if (this.cartItems.length===0){
    // this.cartService.loadCartFromServer();
    // }
    // const cartItem = this.cartItems.find(i => i.Id === this.products.Id);
    this.cartService.addToCart(this.products);
    console.log(`${this.products.ProductName} added to cart`);
  }

  updateQuantity(id: string, qty: number) {
    console.log('quantity updating')

    this.cartService.updateQuantity(id, qty);
  }

}
