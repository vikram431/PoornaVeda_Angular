import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { AuthService } from "../../auth/auth/auth.service";
import { ToastService } from "../../services/toast.service";

export interface CartItem {
  id: any;
  productName: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
  stockQuantity: number;
  cartId: any;
  cartItemId: any;
  itemOutStock: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class cartService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private toastService: ToastService
  ) { };

  private cartOpenSubject = new BehaviorSubject<boolean>(false);
  cartOpen$ = this.cartOpenSubject.asObservable();


  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();


  cartCount$ = this.cartItems$.pipe(
    map((items: CartItem[]) => items.reduce((sum, i) => sum + (Number(i.quantity) || 0), 0))
  );

  loadCartFromServer() {
    this.http.get<CartItem[]>(this.apiUrl).subscribe(items => {
      console.log('service response', items)
      this.cartItemsSubject.next([...items]);
    });
  }

  addToCart(product: any, quantity: number = 1) {
    // 1. Authentication check
    const token = localStorage.getItem('token');
    if (!token) {
      this.toastService.info("Please sign in to add items to your cart.");
      this.authService.logout();
      return;
    }

    console.log('cartItemsSubject', this.cartItemsSubject.value[0]);
    const items = [...this.cartItemsSubject.value]
    let existing = items.find(i => i.id === product.id)

    if (existing) {
      existing.quantity += quantity;
    } else {
      existing = {
        id: product.id,
        productName: product.productName,
        category: product.category,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: quantity,
        stockQuantity: product.quantity, // product.quantity from backend is stockQuantity
        cartItemId: '',
        cartId: '',
        itemOutStock: false
      };
      items.push(existing);
    }

    this.addDataInCart(existing).subscribe({
      next: (res) => {
        console.log('data save successfully', res);
        existing.cartId = res.cartId;
        existing.cartItemId = res.cartItemId;
        this.cartItemsSubject.next([...items]);
        this.toastService.success(`${product.productName} added to cart!`);
      },
      error: (err) => {
        console.error('Error adding to cart', err);
        if (err.status === 401 || err.status === 403) {
          this.toastService.error("Session expired. Please login again.");
          this.authService.logout();
        } else {
          this.toastService.error("Could not add item to cart. Please try again later.");
        }
      }
    });
  }


  buyAgain(items: any[]) {
    items.forEach(item => {
      const product = {
        id: item.id,
        productName: item.productName,
        price: item.price,
        imageUrl: item.imageUrl,
        quantity: item.stockQuantity || 100 
      };
      this.addToCart(product, item.quantity);
    });
    this.openCart();
  }

  clearCartLocal() {
    this.cartItemsSubject.next([]);
  }

  updateQuantity(id: string, qty: number) {
    const items = [...this.cartItemsSubject.value];
    let item = items.find(i => i.id === id);

    if (!item) return;
    if (qty < 1) return;

    if (qty > item.stockQuantity) {
      item.itemOutStock = true;
      this.cartItemsSubject.next([...items]);
      this.toastService.info(`Only ${item.stockQuantity} units available in stock.`);
      return;
    }

    item.quantity = qty;
    item.itemOutStock = false;

    this.addDataInCart(item).subscribe({
      next: (res) => {
        console.log('Quantity updated successfully', res);
        this.cartItemsSubject.next([...items]);
      },
      error: (err) => {
        console.error('Error updating quantity', err);
        this.toastService.error("Failed to update quantity. Please try again.");
      }
    });
  }

  removeFromCart(id: string) {

    this.removeItemFromCart(id).subscribe(res => {
      console.log(res);

      const items = this.cartItemsSubject.value.filter(i => i.cartItemId != id);

      this.cartItemsSubject.next([...items]);

    });

  }


  openCart() {
    this.cartOpenSubject.next(true);
  }

  closeCart() {
    this.cartOpenSubject.next(false);
  }

  private apiUrl = 'http://localhost:8080/cart/allItems'

  getAllItems(): Observable<any> {
    const headers = new HttpHeaders({ 'content-type': 'application/json' })
    console.log(headers);
    return this.http.get<any>(this.apiUrl, { headers })
  }

  private saveApiUrl = 'http://localhost:8080/cart/saveItems';

  addDataInCart(data: any): Observable<any> {
    console.log('Sending to backend:', data);
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    return this.http.post<any>(this.saveApiUrl, data, { headers });
  }

  private removeApiUrl = 'http://localhost:8080/cart/remove';
  removeItemFromCart(id: string): Observable<any> {
    const params = new HttpParams().set(
      'id', id
    );
    const headers = new HttpHeaders({ 'content-type': 'application/json' })
    return this.http.delete<any>(this.removeApiUrl, { headers, params })
  }

  private saveOrderApiUrl = 'http://localhost:8080/order/save';
  saveOrderItems(Data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(this.saveOrderApiUrl, Data, { headers });
  }


}