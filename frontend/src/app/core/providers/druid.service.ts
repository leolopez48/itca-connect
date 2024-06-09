import { Injectable } from "@angular/core";
import Http from "./http.service";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DruidService extends Http {
    baseUrl = environment.coreApi + '/druid'

    super() { }

    async query(sql: String) {
        return await this.post('', {
            "sql": sql,
        })
    }
}