import { Component, OnInit } from '@angular/core';
import { cartService } from '../cart-sheet/cart-sheet.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, MinValidator, Validators } from '@angular/forms';
import { CommonModule, } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  cartItems: any[] = [];
  selectedPayment = 'COD';
  addresses: any[] = [];
  newAddress: FormGroup;
  selectedAddress: any = null;

  constructor(
    private cartService: cartService,
    private http: HttpClient,
    private formbuilder: FormBuilder
  ) { 
     this.newAddress = this.formbuilder.group({
    name: ['',[Validators.required]],
    mobile: ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
    addressLine: ['',Validators.required],
    city: ['',Validators.required],
    pincode: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(6)]]
  });
  }




showAddressForm = true;

ngOnInit(): void {
  this.cartService.cartItems$.subscribe(items => {
    this.cartItems = items;
  });

  // Example: Load from backend (replace later)
  this.loadAddresses();
}

loadAddresses() {
  // Replace with API
  this.addresses = [];

  // console.log('addresses Length',this.addresses.length);

  if (this.addresses.length > 0) {
    this.selectedAddress = this.addresses[0];
  }
}

addAddress() {
  this.addresses.push({ ...this.newAddress.value });
  this.selectedAddress = this.newAddress.value;
  this.newAddress.reset(); 
  this.showAddressForm = false;
}

selectAddress(addr: any) {
  this.selectedAddress = addr;
}

  get totalAmount(): number {
  return this.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

placeOrder() {

  // const payload = this.cartItems.map(item => ({
  //   productId: item.Id,
  //   cartId: item.cartId,
  //   cartItemId: item.cartItemId,
  //   quantity: item.quantity,
  //   price: item.price
  // }));

  this.cartService.saveOrderItems(this.cartItems).subscribe({
    next: (res) => {
      alert('Order Placed Successfully');
      this.cartItems = [];
    },
    error: (err) => {
      console.error(err);
      alert('Order Failed');
    }
  });
}
}