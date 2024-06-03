import { Injectable } from "@angular/core";
import Http from "./http.service";

@Injectable()
export class NotificationService extends Http {
    baseUrl = 'http://192.168.1.253:3000'

    super() { }
}