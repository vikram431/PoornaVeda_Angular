import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";

export interface CartItem {
  id :string;
  name: string;
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
private cartOpenSubject= new BehaviorSubject<boolean>(false);
//   private cartOpenSubject = new BehaviorSubject<boolean>(false);
cartOpen$=this.cartOpenSubject.asObservable();

// private cartCountSubject = new BehaviorSubject<number>(0);

private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
cartItems$=this.cartItemsSubject.asObservable();

// cartCount$=this.cartItemsSubject.asObservable();

  cartCount$ = this.cartItems$.pipe(
    map((items: CartItem[]) => items.reduce((sum, i) => sum + i.quantity, 0))
  );


addToCart(product: any){
    const items= [...this.cartItemsSubject.value]
    const existing= items.find(i => i.id===product.id)

    if(existing){
        existing.quantity++;
        console.log('existing')
    }
    else{
         items.push({
            id :product.id,
            name: product.name,
            category: product.category,
            description: product.description,
            price: product.price,
            image: product.image,
            quantity:product.quantity
      });
    }
    this.cartItemsSubject.next(items);
}

removeFromCart(id:string){

    const updatedItems = this.cartItemsSubject.value.filter(i => i.id !== id);
    console.log('Updated items:', updatedItems);
    this.cartItemsSubject.next(updatedItems);
    

}





openCart(){
    this.cartOpenSubject.next(true);
}

closeCart(){
    this.cartOpenSubject.next(false);
}
}