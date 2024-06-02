import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  private apiUrl = 'http://64.23.242.28:8001/itca-connect-auth-ldap/authenticate';
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
    
    return this.http.put<any>(this.apiUrl, body, { headers: headers });
  }
}
