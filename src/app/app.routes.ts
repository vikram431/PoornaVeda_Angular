import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { AuthComponent } from './auth/auth/auth.component';
import { CartSheetComponent } from './components/cart-sheet/cart-sheet.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart-sheet', component: CartSheetComponent },
  {path:'contact',component:ContactComponent},
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: '' }
];
