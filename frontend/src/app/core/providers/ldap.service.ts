import { Injectable } from "@angular/core";
import Http from "./http.service";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LdapService extends Http {
  baseUrl = (environment as any).ldapApi

  super() { }
}