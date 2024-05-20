import Http from "./http.service";

export class DruidService extends Http {
    baseUrl = '/druid'

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