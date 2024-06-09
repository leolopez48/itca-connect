import { Injectable } from "@angular/core";
import Http from "./http.service";

@Injectable({
    providedIn: 'root'
})
export class DruidService extends Http {
    baseUrl = 'http://192.168.1.253:9090/api/druid'

    super() { }

    async query(sql: String) {
        return await this.post('', {
            "sql": sql,
        })
    }
}