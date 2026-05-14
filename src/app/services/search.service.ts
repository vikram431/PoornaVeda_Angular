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
    // In a real app, this would be an API call
    // For now, we'll fetch all and filter client-side
    return new Observable(observer => {
      if (!query || query.length < 2) {
        observer.next([]);
        return;
      }

      this.productService.getAllProducts().subscribe(products => {
        const results = products.filter((p: any) => 
          p.ProductName.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
        );
        observer.next(results.slice(0, 5)); // Limit to 5 results
      });
    });
  }
}
