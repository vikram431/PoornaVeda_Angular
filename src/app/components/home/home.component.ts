import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// Standalone components
import { HeroComponent } from '../hero/hero.component';
import { ValuesComponent } from '../values/values.component';
import { AnnouncementBarComponent } from '../announcement-bar/announcement-bar.component';
import { ProductsComponent } from '../products/products.component';
import { StoryComponent } from '../story/story.component';
import { FooterComponent } from '../footer/footer.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { CartSheetComponent } from '../cart-sheet/cart-sheet.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NavigationComponent,
    RouterOutlet,
    HeroComponent,
    ProductsComponent,
    ValuesComponent,
    StoryComponent,
    FooterComponent,
    AnnouncementBarComponent,
    CartSheetComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  cartOpen = false;
  cartItemsCount = 3; // Example value

  onCartOpen(): void {
    this.cartOpen = true;
  }

  onCartClose(): void {
    this.cartOpen = false;
  }
}
