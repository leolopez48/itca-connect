import { Injectable } from "@angular/core";
import Http from "./http.service";

@Injectable()
export class NotificationService extends Http {
    baseUrl = 'http://64.23.242.28:3000'

    super() { }
}