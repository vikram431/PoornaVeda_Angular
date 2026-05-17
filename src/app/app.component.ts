import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartSheetComponent } from './components/cart-sheet/cart-sheet.component';
import { cartService } from './components/cart-sheet/cart-sheet.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { AnnouncementBarComponent } from './components/announcement-bar/announcement-bar.component';
import { SearchComponent } from './components/search/search.component';
import { ToastComponent } from './components/toast/toast.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CartSheetComponent, NavigationComponent, FooterComponent, AnnouncementBarComponent, SearchComponent, ToastComponent],
  template: `
    <app-toast></app-toast>
    <app-announcement-bar *ngIf="!isAuthPage()"></app-announcement-bar>
    <app-navigation *ngIf="!isAuthPage()"></app-navigation>
    <main [class.auth-layout]="isAuthPage()">
      <router-outlet></router-outlet>
    </main>
    <app-footer *ngIf="!isAuthPage()"></app-footer>
    <app-cart-sheet></app-cart-sheet>
    <app-search></app-search>
  `



})
export class AppComponent {
  title = 'PoornaVeda';
  constructor(private cartService: cartService, private router: Router) {}

  isAuthPage(): boolean {
    return this.router.url.includes('/auth');
  }

ngOnInit() {
  this.cartService.loadCartFromServer();
}
}
