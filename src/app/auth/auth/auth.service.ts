import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) {}
   
  private apiUrl = 'http://localhost:8080/getUserDetails/userByEmailId';

  getuserdetails(EmailId: string, password :string ): Observable<any>{
    const headers=new HttpHeaders({ 'Content-Type': 'application/json' });
    // const params=new HttpParams()
    //         .set('EmailId', EmailId)
    //         .set('password',password);
    const body = {
    email: EmailId,
    password: password
  };
    return this.http.post<any>(this.apiUrl,body,{headers})
  }
}
