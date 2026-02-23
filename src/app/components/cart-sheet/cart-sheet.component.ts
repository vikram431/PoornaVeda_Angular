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
  session = { userId: 1 }; // mock session
  cartItems: any[] = [];

  loading = false;

  private cartSub!: Subscription;

  constructor(private cartService: cartService) {
   
  }

  ngOnInit(): void {
    this.cartSub = this.cartService.cartOpen$.subscribe((isOpen:boolean)=> {
      this.isOpen = isOpen;

      if (isOpen) {
        this.loadCartItems();
      }
    });

    this.cartService.cartItems$.subscribe(items=>{
      this.cartItems=items;
      console.log(this.cartItems);
    })

 
  }

  ngOnDestroy(): void {
    if (this.cartSub) {
      this.cartSub.unsubscribe();
    }
  }

  closeSheet(): void {
    this.cartService.closeCart();
  }

  loadCartItems(): void {
    this.loading = true;

    // Simulated API call
    setTimeout(() => {
      this.cartItems
      this.loading = false;
    }, 500);
  }

  updateQuantity(id: string, qty: number): void {
    if (qty < 1) return;

    const item = this.cartItems.find(i => i.Id === id);
    if (item) {
      item.quantity = qty;
      console.log('cart data',item);
      this.cartService.addDataInCart(item).subscribe(res=>{
        console.log('data save successfully',res);
      })
    }
  }

  removeItem(id: string): void {
    this.cartService.removeFromCart(id);
  }

  get total(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  onClickProceed():any{

  }
}
