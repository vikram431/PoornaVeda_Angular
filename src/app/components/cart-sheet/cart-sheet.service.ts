import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";

export interface CartItem {
  Id: string;
  ProductName: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
  stockQuantity: number;
  cartId: string;
  cartItemId: string;
  itemOutStock: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class cartService {

  constructor(private http: HttpClient) { };

  private cartOpenSubject = new BehaviorSubject<boolean>(false);
  cartOpen$ = this.cartOpenSubject.asObservable();


  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();


  cartCount$ = this.cartItems$.pipe(
    map((items: CartItem[]) => items.reduce((sum, i) => sum + i.quantity, 0))
  );

  loadCartFromServer() {
    this.http.get<CartItem[]>(this.apiUrl).subscribe(items => {
      console.log('service response', items)
      this.cartItemsSubject.next([...items]);
    });
  }

  addToCart(product: any, quantity: number = 1) {
    console.log('cartItemsSubject', this.cartItemsSubject.value[0]);
    const items = [...this.cartItemsSubject.value]
    let existing = items.find(i => i.Id === product.Id)

    if (existing) {
      existing.quantity += quantity;
    } else {
      existing = {
        Id: product.Id,
        ProductName: product.ProductName,
        category: product.category,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: quantity,
        stockQuantity: product.stockQuantity,
        cartItemId: '',
        cartId: '',
        itemOutStock: false
      };
      items.push(existing);
    }


    console.log('items ', items);

    this.addDataInCart(existing).subscribe(res => {
      console.log('data save successfully', res);
      existing.cartId = res.cartId;
      existing.cartItemId = res.cartItemId;
      console.log('items ', items);
      this.cartItemsSubject.next([...items]);
    })
  }


  updateQuantity(id: string, qty: number) {

    const items = [...this.cartItemsSubject.value];
    let item = items.find(i => i.Id === id);

    console.log('item', item)
    if (qty < 1) return;

    if (item) {

      if (qty > item?.stockQuantity) {
        item.itemOutStock = true;
        this.cartItemsSubject.next([...items]);

      }

      else {
        item.quantity = qty;
        item.itemOutStock = false;
        this.addDataInCart(item).subscribe(res => {
          console.log('data save successfully', res);
          this.cartItemsSubject.next([...items]);
        })
      }
    }
  }

  removeFromCart(Id: string) {

    this.removeItemFromCart(Id).subscribe(res => {
      console.log(res);

      const items = this.cartItemsSubject.value.filter(i => i.cartItemId !== Id);

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
    const headers = new HttpHeaders({ 'content-type': 'application/json' })
    console.log(headers);
    return this.http.post<any>(this.saveApiUrl, data, { headers })
  }

  private removeApiUrl = 'http://localhost:8080/cart/remove';
  removeItemFromCart(Id: string): Observable<any> {
    const params = new HttpParams().set(
      'Id', Id
    );
    const headers = new HttpHeaders({ 'content-type': 'application/json' })
    return this.http.delete<any>(this.removeApiUrl, { headers, params })
  }

   private saveOrderApiUrl = 'http://localhost:8080/order/save';
   saveOrderItems(Data: any): Observable<any> {
    // const params = new HttpParams().set(
    //   'Id', Id
    // );
    const headers = new HttpHeaders({ 'content-type': 'application/json' })
    return this.http.post<any>(this.saveOrderApiUrl, Data, { headers })
  }


}