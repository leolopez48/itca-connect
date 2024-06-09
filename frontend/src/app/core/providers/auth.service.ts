import { Injectable } from "@angular/core";
import Http from "./http.service";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Http {
  baseUrl = environment.authApi;

  super() { }
}