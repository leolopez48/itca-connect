import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICampus, IEvent } from '../../../model/event.interface';

@Injectable({
  providedIn: 'root'
})
export class CampusService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.coreApi;
  }

  Index(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/campus');
  }

  Create(data: ICampus): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/campus', data);
  }

  Edit(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let params = new HttpParams()
      .set('id', data.id)
      .set('name', data.name)

    console.log(params.toString());

    return this.httpClient.put(this.baseUrl + '/campus/' + data.id, null, { headers: headers, params: params });
  }

  Delete(id: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    let params = new HttpParams().append('id', id)
    return this.httpClient.delete(this.baseUrl + '/campus/' + id, { headers: headers, params: params });
  }
}
