import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Product {
  id : string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

@Component({
  selector: 'app-feature-product',
  imports: [ProductCardComponent,CommonModule],
  templateUrl: './feature-product.component.html',
  styleUrl: './feature-product.component.css'
})
export class FeatureProductComponent {

    constructor(private router: Router) {}

products: Product[] = [
    {
       id:'1' ,
      name: 'Dry Fruit Ladoo',
      category: 'Traditional Sweets',
      description: 'Handcrafted with pure cow milk and premium dry fruits',
      price: 450,
      image: 'assets/images/ladoo.jpg', // Replace with real image path if available
      quantity: 1
    },
    {
       id:'2' ,
      name: 'Handwoven Silk',
      category: 'Artisanal Textiles',
      description: 'Pure silk cloth woven by skilled rural artisans',
      price: 2800,
      image: 'assets/images/silk.jpg',
      quantity: 1
    },
    {
       id:'3' ,
      name: 'Natural Incense',
      category: 'Home Essentials',
      description: 'Sacred herbs and natural ingredients for pure atmosphere',
      price: 280,
      image: 'assets/images/incense.jpg',
      quantity: 1
    },
    {
       id:'4' ,
      name: 'Heritage Spice Box',
      category: 'Kitchen Collection',
      description: 'Authentic spices in traditional brass masala dabba',
      price: 850,
      image: 'assets/images/spicebox.jpg',
      quantity: 1
    }
  ];


    navigate(path: string): void {
    console.log(path);
    this.router.navigate([path]);
    // this.mobileMenuOpen = false;
  }
}
