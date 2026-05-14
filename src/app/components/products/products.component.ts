import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { cartService } from '../cart-sheet/cart-sheet.service';
import { ProductService } from './products.service';

interface Product {
  Id :string;
  ProductName: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity:number;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  isOpen = false;

  
  products:any ;

  constructor(private cartService: cartService, private productService:ProductService) {

    this.productService.getAllProducts().subscribe(res=>{
      this.products=res;
      console.log(this.products)
    })
  }

  refreshProducts() {

    this.productService.getAllProducts().subscribe(res => {
      this.products = res;
    });
  }


  openCartSheet() {
    console.log('ajhd');
  }


  ngOnInit() {
    this.cartService.cartOpen$.subscribe(isOpen => {
      if (isOpen) {
        this.openCartSheet();
      }
    })
  }



}
