import { Injectable } from "@angular/core";
import Http from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Http {
  baseUrl = 'http://192.168.1.253:8001/itca-connect-auth-ldap'

  super() { }
}