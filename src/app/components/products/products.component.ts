import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [
    {
      name: 'Dry Fruit Ladoo',
      category: 'Traditional Sweets',
      description: 'Handcrafted with pure cow milk and premium dry fruits',
      price: '₹450',
      image: 'assets/images/ladoo.jpg' // Replace with real image path if available
    },
    {
      name: 'Handwoven Silk',
      category: 'Artisanal Textiles',
      description: 'Pure silk cloth woven by skilled rural artisans',
      price: '₹2,800',
      image: 'assets/images/silk.jpg'
    },
    {
      name: 'Natural Incense',
      category: 'Home Essentials',
      description: 'Sacred herbs and natural ingredients for pure atmosphere',
      price: '₹280',
      image: 'assets/images/incense.jpg'
    },
    {
      name: 'Heritage Spice Box',
      category: 'Kitchen Collection',
      description: 'Authentic spices in traditional brass masala dabba',
      price: '₹850',
      image: 'assets/images/spicebox.jpg'
    }
  ];

  addToCart(product: Product): void {
    console.log(`${product.name} added to cart.`);
    // You can extend this later with real cart functionality
  }
}
