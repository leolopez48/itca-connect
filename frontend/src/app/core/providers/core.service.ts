import Http from "./http.service";

export class CoreService extends Http {
    baseUrl = 'http://localhost:8000/api'

    super() { }
}