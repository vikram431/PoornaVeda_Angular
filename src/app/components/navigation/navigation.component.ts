import { Component, OnInit, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { cartService } from '../cart-sheet/cart-sheet.service';
import { AuthService } from '../../auth/auth/auth.service';
import { ProfileService } from '../profile/profile.service';
import { SearchService } from '../../services/search.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  cartItemsCount:number = 0;
  activeRoute = '';
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  isLoggedIn = false;
  mobileMenuOpen = false;

  constructor(
    private router: Router, 
    private cartService: cartService,
    private authService :AuthService, 
    private profileService:ProfileService,
    private searchService: SearchService
  ) {

        this.authService.isLoogedIn$.subscribe(status=>{

          this.isLoggedIn=status
          //  this.isLoggedIn = false;
          console.log(this.isLoggedIn);

        })
  }

  ngOnInit(): void {
     this.cartService.cartCount$.subscribe(count => {
      console.log('Nav received cart count:', count);
      this.cartItemsCount = count;
    });

      this.activeRoute = this.router.url;

    // Update active tab whenever route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.activeRoute = event.urlAfterRedirects;
      });
    
    //   this.router.events
    // .pipe(filter(event => event instanceof NavigationEnd))
    // .subscribe((event: any) => {
    //   this.activeRoute = event.urlAfterRedirects;
    // });

  }


  toggleMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  onCartClick(): void {
      this.cartService.openCart();
      // this.cartService.getAllItems().subscribe(res=>{
      // console.log('cart items',res);
    // })
    console.log('cart-clicked');

   
  }

    onSearchClick(): void {
    this.searchService.open();
  }

  onProfileClick(): void {

    this.navigate('profile');
    // const userid = '2';
    // this.authService.getuserdetails(userid).subscribe(res=>{
    // })

  }


  signOut(): void {

    this.authService.logout();
    alert('Signed out');
    // Later: Call your backend logout API
  }

  navigate(path: string): void {
    console.log(path);
    // this.activeRoute = path;
    this.router.navigate([path]);
    this.mobileMenuOpen = false;
  }
}
