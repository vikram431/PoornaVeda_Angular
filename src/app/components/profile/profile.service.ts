import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn:'root'
})
export class ProfileService{
     
    constructor(private http: HttpClient){};

    private apiUrl='http://localhost:8080/user/userDetails';

    getUserDetails(emailId:string) :Observable<any>{
        const headers= new HttpHeaders({'Content-Type': 'application/json' })
        const params= new HttpParams().set('emailId',emailId)
        return this.http.get<any>(this.apiUrl, { headers, params });
    }

}