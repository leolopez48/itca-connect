import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom, take } from "rxjs";

@Injectable()
export class Http {
    baseUrl = 'http://localhost:8000/api'
    token = localStorage.getItem('accessToken');
    headers = {
        'Authorization': `Bearer ${this.token}`
    }

    constructor(private http: HttpClient) { }

    async get<T>(url: string, params?: HttpParams, headers?: HttpHeaders): Promise<T> {
        const options = { params, headers: { ...this.headers, ...headers } };

        const request = this.http.get<T>(`${this.baseUrl}${url}`, options).pipe(take(1));

        return await lastValueFrom<T>(request);
    }

    async post<T>(url: string, body: any | null, headers?: HttpHeaders | { [header: string]: string | string[]; }): Promise<any> {
        const options = { headers: { ...this.headers, ...headers } };

        const request = this.http.post<T>(`${this.baseUrl}${url}`, body, options).pipe(take(1));

        return await lastValueFrom<T>(request);
    }

    async put<T>(url: string, body: any, headers?: HttpHeaders): Promise<T> {
        const options = { headers: { ...this.headers, ...headers } };

        const request = this.http.put<T>(`${this.baseUrl}${url}`, body, options).pipe(take(1));

        return await lastValueFrom<T>(request);
    }

    async delete<T>(url: string, body: any, headers?: HttpHeaders): Promise<T> {
        const options = { headers: { ...this.headers, ...headers } };

        const request = this.http.delete<T>(`${this.baseUrl}${url}`, options).pipe(take(1));

        return await lastValueFrom<T>(request);
    }

    setParams(params: any): HttpParams {
        let httpParams = new HttpParams();

        Object.keys(params).forEach(function (key) {
            httpParams = httpParams.append(key, params[key]);
        });

        return httpParams;
    }
}

export default Http;