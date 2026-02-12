import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) {}
   
  private apiUrl = 'http://localhost:8080/getUserDetails/userByEmailId';

  getuserdetails(userid: string): Observable<string>{
    const headers=new HttpHeaders({ 'Content-Type': 'application/json' });
    const params=new HttpParams()
            .set('EmailId', userid);
    return this.http.get(this.apiUrl,{headers,params, responseType: 'text'})
  }
}
