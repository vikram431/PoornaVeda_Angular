import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";

export interface CartItem {
  Id :string;
  ProductName: string;
  category: string;
  description: string;
  price: number;
  image: string;
  quantity:number;
}

@Injectable({
    providedIn:'root'
})
export class cartService{

constructor(private http:HttpClient){};

private cartOpenSubject= new BehaviorSubject<boolean>(false);
cartOpen$=this.cartOpenSubject.asObservable();


private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
cartItems$=this.cartItemsSubject.asObservable();


  cartCount$ = this.cartItems$.pipe(
    map((items: CartItem[]) => items.reduce((sum, i) => sum + i.quantity, 0))
  );


addToCart(product: any){
    console.log(this.cartItemsSubject.value);
    const items= [...this.cartItemsSubject.value]
    const existing= items.find(i => i.Id===product.Id)

    if(existing){
        existing.quantity++;
        console.log('existing')
    }
    else{
         items.push({
            Id :product.Id,
            ProductName: product.ProductName,
            category: product.category,
            description: product.description,
            price: product.price,
            image: product.image,
            quantity:0
      });
    }
    this.cartItemsSubject.next(items);
}

removeFromCart(Id:string){

    const updatedItems = this.cartItemsSubject.value.filter(i => i.Id !== Id);
    console.log('Updated items:', updatedItems);
    this.cartItemsSubject.next(updatedItems);
    

}


openCart(){
    this.cartOpenSubject.next(true);
}

closeCart(){
    this.cartOpenSubject.next(false);
}

private apiUrl='http://localhost:8080/cart/allItems'

 getAllItems():Observable<any>{
    const headers= new HttpHeaders({'content-type':'application/json'})
     console.log(headers);
   return this.http.get<any>(this.apiUrl,{headers})
 }

 private saveApiUrl='http://localhost:8080/cart/saveItems'

  addDataInCart(data:string):Observable<any>{
    const headers= new HttpHeaders({'content-type':'application/json'})
     console.log(headers);
   return this.http.post<any>(this.saveApiUrl,data,{headers})
 }


}