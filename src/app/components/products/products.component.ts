import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { cartService } from '../cart-sheet/cart-sheet.service';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  quantity:number
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, NavigationComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  isOpen = false;

  products: Product[] = [
    {
      id:'1' ,
      name: 'Dry Fruit Ladoo',
      category: 'Traditional Sweets',
      description: 'Handcrafted with pure cow milk and premium dry fruits',
      price: 450,
      image: '/assets/hero-image.jpg', // Replace with real image path if available,
      quantity: 1
    },
    {
      id:'2' ,
      name: 'Handwoven Silk',
      category: 'Artisanal Textiles',
      description: 'Pure silk cloth woven by skilled rural artisans',
      price: 2800,
      image: '/assets/silk.jpg',
      quantity: 1
    },
    {
       id:'3' ,
      name: 'Natural Incense',
      category: 'Home Essentials',
      description: 'Sacred herbs and natural ingredients for pure atmosphere',
      price: 280,
      image: '/assets/incense.jpg',
      quantity: 1
    },
    {
       id:'4' ,
      name: 'Heritage Spice Box',
      category: 'Kitchen Collection',
      description: 'Authentic spices in traditional brass masala dabba',
      price: 852,
      image: '/assets/spicebox.jpg',
      quantity: 1
    },
    {
       id:'5' ,
      name: 'Heritage Spice Box2',
      category: 'Kitchen Collection',
      description: 'Authentic spices in traditional brass masala dabba',
      price: 80,
      image: '/assets/spicebox.jpg',
      quantity: 1
    },
    {
       id:'6' ,
      name: 'Heritage Spice Box1',
      category: 'Kitchen Collection',
      description: 'Authentic spices in traditional brass masala dabba',
      price: 850,
      image: '/assets/spicebox.jpg',
      quantity: 1
    }
  ];

  addToCart(product: Product): void {
    console.log(`${product.name} added to cart.`);
    // You can extend this later with real cart functionality
  }

  constructor(private cartService: cartService) { };

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
