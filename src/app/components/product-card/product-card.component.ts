import { Component ,Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cartService } from '../cart-sheet/cart-sheet.service';



interface Products {
  Id :string;
  ProductName: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity:number;
}


@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
   
  @Input() products!: Products;

  constructor(private cartService: cartService){
  }

  
  addToCart(): void {
    this.cartService.addToCart(this.products);
    console.log(`${this.products.ProductName} added to cart`);
  }
   
}
