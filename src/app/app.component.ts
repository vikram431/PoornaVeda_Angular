import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartSheetComponent } from './components/cart-sheet/cart-sheet.component';
import { cartService } from './components/cart-sheet/cart-sheet.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { AnnouncementBarComponent } from './components/announcement-bar/announcement-bar.component';
import { SearchComponent } from './components/search/search.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CartSheetComponent, NavigationComponent, FooterComponent, AnnouncementBarComponent, SearchComponent],
  template: `
    <app-announcement-bar></app-announcement-bar>
    <app-navigation></app-navigation>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
    <app-cart-sheet></app-cart-sheet>
    <app-search></app-search>
  `



})
export class AppComponent {
  title = 'PoornaVeda';
    constructor(private cartService: cartService) {}

ngOnInit() {
  this.cartService.loadCartFromServer();
}
}
