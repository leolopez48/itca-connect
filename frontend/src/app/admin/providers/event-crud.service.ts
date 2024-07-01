import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEvent } from '../../../model/event.interface';

@Injectable({
  providedIn: 'root'
})
export class EventCrudService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.coreApi;
  }

  Index(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/event');
  }

  Create(data: FormData): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/event', data);
  }

  Edit(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let params = new HttpParams()
      .set('id', data.id)
      .set('name', data.name)
      .set('date_start', data.date_start)
      .set('date_end', data.date_end)
      .set('type_event', data.type_event);

    console.log(params.toString());

    return this.httpClient.put(this.baseUrl + '/event/' + data.id, null, { headers: headers, params: params });
  }

  Delete(id: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    let params = new HttpParams().append('id', id)
    return this.httpClient.delete(this.baseUrl + '/event/' + id, { headers: headers, params: params });
  }
}
