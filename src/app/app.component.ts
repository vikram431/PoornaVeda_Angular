import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartSheetComponent } from './components/cart-sheet/cart-sheet.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CartSheetComponent],
  template: `
    <router-outlet></router-outlet>
    <app-cart-sheet></app-cart-sheet>
  `
})
export class AppComponent {
  title = 'PoornaVeda';
}
