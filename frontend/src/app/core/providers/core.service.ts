import { Injectable } from "@angular/core";
import Http from "./http.service";

@Injectable()
export class CoreService extends Http {
    baseUrl = 'http://64.23.242.28:9090/api'

    super() { }
}