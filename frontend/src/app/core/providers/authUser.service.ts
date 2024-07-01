import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  private coreApi = (environment as any).loginApi;
  private accessToken: any;

  constructor(private http: HttpClient) {
    this.accessToken = localStorage.getItem('accessToken') || '{}';
  }

  ActualizarInfo(password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });

    const body = {
      password: password
    };

    

    

    // console.log(headers,body);

    return this.http.put<any>(this.coreApi, body, { headers: headers });
  }
}
