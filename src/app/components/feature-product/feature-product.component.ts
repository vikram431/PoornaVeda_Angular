import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../products/products.service';

interface Product {
  id : any;
  productName: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

@Component({
  selector: 'app-feature-product',
  imports: [ProductCardComponent,CommonModule],
  templateUrl: './feature-product.component.html',
  styleUrl: './feature-product.component.css'
})
export class FeatureProductComponent {


    allProducts: any[] = [];
    filteredProducts: any[] = [];
    categories: string[] = [];
    selectedCategory: string = 'All';

    constructor(private router: Router, private productService: ProductService) {
      this.productService.getFeatureProducts().subscribe(res => {
        this.allProducts = res;
        this.extractCategories();
        this.applyFilter();
      });
    }

    extractCategories() {
      const cats = this.allProducts.map(p => p.category);
      this.categories = ['All', ...new Set(cats)];
    }

    selectCategory(category: string) {
      this.selectedCategory = category;
      this.applyFilter();
    }

    applyFilter() {
      if (this.selectedCategory === 'All') {
        this.filteredProducts = this.allProducts;
      } else {
        this.filteredProducts = this.allProducts.filter(p => p.category === this.selectedCategory);
      }
    }

// products: Product[] = [
//     {
//        id:'1' ,
//       name: 'Dry Fruit Ladoo',
//       category: 'Traditional Sweets',
//       description: 'Handcrafted with pure cow milk and premium dry fruits',
//       price: 450,
//       image: 'assets/images/ladoo.jpg', // Replace with real image path if available
//       quantity: 1
//     },
//     {
//        id:'2' ,
//       name: 'Handwoven Silk',
//       category: 'Artisanal Textiles',
//       description: 'Pure silk cloth woven by skilled rural artisans',
//       price: 2800,
//       image_url: 'assets/images/silk.jpg',
//       quantity: 1
//     },
//     {
//        id:'3' ,
//       name: 'Natural Incense',
//       category: 'Home Essentials',
//       description: 'Sacred herbs and natural ingredients for pure atmosphere',
//       price: 280,
//       image: 'assets/images/incense.jpg',
//       quantity: 1
//     },
//     {
//        id:'4' ,
//       name: 'Heritage Spice Box',
//       category: 'Kitchen Collection',
//       description: 'Authentic spices in traditional brass masala dabba',
//       price: 850,
//       image: 'assets/images/spicebox.jpg',
//       quantity: 1
//     }
//   ];


    navigate(path: string): void {
    console.log(path);
    this.router.navigate([path]);
    // this.mobileMenuOpen = false;
  }
}
