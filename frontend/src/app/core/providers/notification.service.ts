import { Injectable } from "@angular/core";
import Http from "./http.service";
import { environment } from "../../../environments/environment";

@Injectable()
export class NotificationService extends Http {
    baseUrl = (environment as any).notificationApi;

    super() { }
}