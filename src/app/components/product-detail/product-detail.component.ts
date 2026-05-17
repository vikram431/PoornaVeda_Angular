import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../products/products.service';
import { cartService } from '../cart-sheet/cart-sheet.service';
import { ToastService } from '../../services/toast.service';

import { ProductCardComponent } from '../product-card/product-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ProductCardComponent],

  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  quantity: number = 1;
  loading: boolean = true;
  activeImageIndex: number = 0;
  activeTab: string = 'description';
  similarProducts: any[] = [];
  inCart: boolean = false;
  
  mockReviews = [
    {
      id: 1,
      user: 'Ananya Sharma',
      rating: 5,
      date: 'Oct 12, 2023',
      comment: 'Absolutely love the quality! It feels so authentic and premium. Highly recommend to everyone looking for pure Vedic products.'
    },
    {
      id: 2,
      user: 'Rahul Verma',
      rating: 4,
      date: 'Sep 28, 2023',
      comment: 'Very good product. The packaging was also very nice. Will definitely buy again.'
    },
    {
      id: 3,
      user: 'Priya Patel',
      rating: 5,
      date: 'Aug 15, 2023',
      comment: 'The scent and texture are amazing. You can tell it is made with natural ingredients.'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: cartService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadProduct(id);
      }
    });

    // Single active subscription to dynamically sync cart updates
    this.cartService.cartItems$.subscribe(items => {
      this.syncCartState(items);
    });
  }

  loadProduct(id: string) {
    this.loading = true;
    this.product = null;
    this.inCart = false;
    this.quantity = 1;

    this.productService.getAllProducts().subscribe(products => {
      this.product = products.find((p: any) => p.id == id);
      if (this.product) {
        this.fetchSimilarProducts(this.product.category, id);
        
        // Sync immediately with current cart items
        this.cartService.cartItems$.subscribe(items => {
          this.syncCartState(items);
        }).unsubscribe(); // Synchronous check, unsubscribe immediately
      }
      this.loading = false;
      window.scrollTo(0, 0);
    });
  }

  private syncCartState(items: any[]): void {
    if (this.product) {
      const cartItem = items.find(i => i.id === this.product.id);
      if (cartItem) {
        this.inCart = true;
        this.quantity = cartItem.quantity;
      } else {
        this.inCart = false;
      }
    } else {
      this.inCart = false;
    }
  }

  fetchSimilarProducts(category: string, currentProductId: string) {
    this.productService.getProductsByCategory(category).subscribe(products => {
      this.similarProducts = products
        .filter((p: any) => p.category === category && p.id != currentProductId)
        .slice(0, 4);
    });
  }

  incrementQuantity() {
    if (this.product && this.quantity >= this.product.quantity) {
      this.toastService.info(`Only ${this.product.quantity} units available in stock.`);
      return;
    }
    this.quantity++;
    if (this.inCart) {
      this.cartService.updateQuantity(this.product.id, this.quantity);
    }
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      if (this.inCart) {
        this.cartService.updateQuantity(this.product.id, this.quantity);
      }
    }
  }

  addToCart() {
    if (this.product) {
      if (!this.inCart) {
        this.cartService.addToCart(this.product, this.quantity);
      }
      this.cartService.openCart();
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
