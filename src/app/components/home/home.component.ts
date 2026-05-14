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
import { FeatureProductComponent } from '../feature-product/feature-product.component';
// import { FoodLabelComponent } from '../../food-label/food-label.component';
// import { FoodlabelBackComponent } from '../../foodlabel-back/foodlabel-back.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    ValuesComponent,
    StoryComponent,
    FeatureProductComponent,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  // cartOpen = false;
  // cartItemsCount = 0; 

  // session = { userId: 1 }; 

  // onCartOpen() {
  //   this.cartOpen = true;
  // }

  // onCartClose() {
  //   this.cartOpen = false;
  // }

}
