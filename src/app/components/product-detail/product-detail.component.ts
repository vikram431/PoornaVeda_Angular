import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../products/products.service';
import { cartService } from '../cart-sheet/cart-sheet.service';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],

  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  quantity: number = 1;
  loading: boolean = true;
  activeImageIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: cartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // For now, we might need to fetch all and filter if getById doesn't exist
      // But let's assume we can get it
      this.productService.getAllProducts().subscribe(products => {
        this.product = products.find((p: any) => p.Id === id);
        this.loading = false;
      });
    }
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
      this.cartService.openCart();
    }
  }

}
