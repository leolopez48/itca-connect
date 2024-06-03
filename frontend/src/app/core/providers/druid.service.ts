import { Injectable } from "@angular/core";
import Http from "./http.service";

@Injectable({
    providedIn: 'root'
})
export class DruidService extends Http {
    baseUrl = '/olap/'

    super() { }

    async query(sql: String) {
        return await this.post('', {
            "query": sql,
            "context": {
                "sqlQueryId": "request01"
            }
        })
    }
}