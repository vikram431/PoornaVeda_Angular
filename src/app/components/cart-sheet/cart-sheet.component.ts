import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { cartService } from './cart-sheet.service';


@Component({
  selector: 'app-cart-sheet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-sheet.component.html',
  styleUrls: ['./cart-sheet.component.css']
})
export class CartSheetComponent implements OnInit, OnDestroy {

  isOpen = false;
  session = { userId: 1 }; 
  cartItems: any[] = [];

  loading = false;

  private cartSub!: Subscription;

  constructor(private cartService: cartService) {

  }

 ngOnInit(): void {

  this.cartService.cartItems$.subscribe(items => {
    this.cartItems = items;
  });

  this.cartSub = this.cartService.cartOpen$.subscribe((isOpen: boolean) => {
    this.isOpen = isOpen;

    if (isOpen && this.cartItems.length === 0) {
      this.cartService.loadCartFromServer();
    }
  });

}

  ngOnDestroy(): void {
    if (this.cartSub) {
      this.cartSub.unsubscribe();
    }
  }

  closeSheet(): void {
    this.cartService.closeCart();
  }

  // loadCartItems(): void {
  //   this.loading = true;

  //   this.cartService.getAllItems().subscribe(res => {
  //     console.log('updated data fetched', res);
  //     this.cartItems = res;
  //   })
  //   setTimeout(() => {
  //     this.cartItems
  //     this.loading = false;
  //   }, 500);
  // }


  updateQuantity(id: string, qty: number) {
    console.log('idqty', qty);
    console.log('idqty', id);

    this.cartService.updateQuantity(id, qty);


  }



  removeItem(id: string): void {
    this.cartService.removeFromCart(id);
  }

  get total(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  onClickProceed(): any {

  }
}
