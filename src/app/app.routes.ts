import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { AuthComponent } from './auth/auth/auth.component';
import { CartSheetComponent } from './components/cart-sheet/cart-sheet.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PrivacyPolicyComponent } from './components/legal/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './components/legal/terms-of-service/terms-of-service.component';
import { RefundPolicyComponent } from './components/legal/refund-policy/refund-policy.component';
import { ShippingPolicyComponent } from './components/legal/shipping-policy/shipping-policy.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { AddressComponent } from './components/address/address.component';
import { AboutComponent } from './components/about/about.component';
import { BlogComponent } from './components/blog/blog.component';
import { PaymentSettingsComponent } from './components/profile/payment-settings/payment-settings.component';
import { AccountSettingsComponent } from './components/profile/account-settings/account-settings.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', loadComponent: () => import('./components/product-detail/product-detail.component').then(m => m.ProductDetailComponent) },
  { path: 'cart-sheet', component: CartSheetComponent },

  {path:'contact',component:ContactComponent},
  { path: 'auth', component: AuthComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-of-service', component: TermsOfServiceComponent },
  { path: 'refund-policy', component: RefundPolicyComponent },
  { path: 'shipping-delivery', component: ShippingPolicyComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'order-details/:id', component: OrderDetailsComponent },
  { path: 'address', component: AddressComponent },
  { path: 'about', component: AboutComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:id', loadComponent: () => import('./components/blog-detail/blog-detail.component').then(m => m.BlogDetailComponent) },
  { path: 'payment-settings', component: PaymentSettingsComponent },
  { path: 'account-settings', component: AccountSettingsComponent },
  { path: '**', redirectTo: '' }
];
