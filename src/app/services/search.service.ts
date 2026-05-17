import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductService } from '../components/products/products.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSubject.asObservable();

  constructor(private productService: ProductService) {}

  open() {
    this.isOpenSubject.next(true);
  }

  close() {
    this.isOpenSubject.next(false);
  }

  searchProducts(query: string): Observable<any[]> {
    console.log('Search Service: Received query:', query);
    if (!query || query.length < 2) {
      console.log('Search Service: Query empty or < 2 chars, aborting service call.');
      return new Observable(observer => observer.next([]));
    }
    console.log('Search Service: Invoking ProductService search...');
    return this.productService.searchProducts(query, 5);
  }
}
