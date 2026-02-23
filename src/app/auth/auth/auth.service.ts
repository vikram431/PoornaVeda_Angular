import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private LoggedIn= new BehaviorSubject<boolean>(false)
  isLoogedIn$=this.LoggedIn.asObservable();


  constructor(private http:HttpClient,private router:Router) {

    const token=localStorage.getItem("token")
    if(token){
      this.LoggedIn.next(true)
    }

  }


  setLoginStatus(status :boolean){
    this.LoggedIn.next(status)
  }
   
  logout(message?: string){

     if (message) {
      alert(message); // You can replace with toast/snackbar
    }
    localStorage.removeItem("token")
    this.LoggedIn.next(false)
    this.router.navigate(['/auth']);
  }

  private apiUrl = 'http://localhost:8080/auth/login';

  authenticateUser(EmailId: string, password :string ): Observable<any>{
    const headers=new HttpHeaders({ 'Content-Type': 'application/json' });
    // const params=new HttpParams()
    //         .set('EmailId', EmailId)
    //         .set('password',password);
    const body = {
    email: EmailId,
    password: password
  };
    console.log(headers);
    return this.http.post<any>(this.apiUrl,body,{headers})
  }
}
