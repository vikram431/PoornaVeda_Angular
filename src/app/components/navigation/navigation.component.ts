import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { cartService } from '../cart-sheet/cart-sheet.service';
import { AuthService } from '../../auth/auth/auth.service';

@Component({
  selector: 'app-navigation',
  imports:[CommonModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  cartItemsCount:number = 0;

  isLoggedIn = false; // replace with backend auth check later
  mobileMenuOpen = false;

  constructor(private router: Router, private cartService: cartService,private authService :AuthService) {

  }

  ngOnInit(): void {
     this.cartService.cartCount$.subscribe(count=>{
      this.cartItemsCount=count;
    })   
  }


  toggleMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  onCartClick(): void {
      this.cartService.openCart();
    console.log('cart-clicked');

   
  }

    onProfileClick(): void {
    const userid = '2';
    this.authService.getuserdetails(userid).subscribe(res=>{
        console.log(res);
    })

  }


  signOut(): void {
    this.isLoggedIn = false;
    alert('Signed out');
    // Later: Call your backend logout API
  }

  navigate(path: string): void {
    console.log(path);
    this.router.navigate([path]);
    this.mobileMenuOpen = false;
  }
}
