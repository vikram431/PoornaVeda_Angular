import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { cartService } from '../cart-sheet/cart-sheet.service';
import { ProductService } from './products.service';
import { FormsModule } from '@angular/forms';

interface Product {
  id: any;
  productName: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  
  // Filter states
  searchQuery: string = '';
  selectedCategory: string = 'All';
  sortBy: string = 'featured';

  constructor(private cartService: cartService, private productService: ProductService) {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(res => {
      this.allProducts = res;
      this.extractCategories();
      this.applyFilters();
    });
  }

  extractCategories() {
    const cats = this.allProducts.map(p => p.category);
    this.categories = ['All', ...new Set(cats)];
  }

  applyFilters() {
    let result = [...this.allProducts];

    // Search filter
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(p => 
        p.productName.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (this.selectedCategory !== 'All') {
      result = result.filter(p => p.category === this.selectedCategory);
    }

    // Sort
    switch (this.sortBy) {
      case 'priceLow':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      default:
        // Featured or default order
        break;
    }

    this.filteredProducts = result;
  }

  onSearchChange() {
    this.applyFilters();
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onSortChange() {
    this.applyFilters();
  }

  ngOnInit() {
    this.cartService.cartOpen$.subscribe(isOpen => {
      if (isOpen) {
        // Handle cart open if needed
      }
    });
  }
}
