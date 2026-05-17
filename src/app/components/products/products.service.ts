import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn:'root'
})
export class ProductService{

    private apiUrl='http://localhost:8080/product/allProducts';
    constructor(private http:HttpClient){}

    getAllProducts(): Observable<any>{
       const headers= new HttpHeaders({'content-type':'application/json'})

       return this.http.get<any>(this.apiUrl,{headers});

    }

    private fetureApiUrl='http://localhost:8080/product/featureProducts';
    getFeatureProducts(): Observable<any>{
       const headers= new HttpHeaders({'content-type':'application/json'})

        return this.http.get<any>(this.fetureApiUrl,{headers})
    }

    getProductsByCategory(category: string): Observable<any[]> {
        const headers = new HttpHeaders({ 'content-type': 'application/json' });
        return this.http.get<any[]>(`http://localhost:8080/product/byCategory?category=${category}`, { headers });
    }

    searchProducts(query: string, limit: number = 5): Observable<any[]> {
        const url = `http://localhost:8080/product/search?query=${query}&limit=${limit}`;
        console.log('Product Service: GET request to:', url);
        const headers = new HttpHeaders({ 'content-type': 'application/json' });
        return this.http.get<any[]>(url, { headers });
    }
}