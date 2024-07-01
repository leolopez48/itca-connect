import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEvent } from '../../../model/event.interface';

@Injectable({
  providedIn: 'root'
})
export class EventTypeService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.coreApi;
  }

  Index(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/typeEvent');
  }

  async getIndex(): Promise<any> {
    try {
      const res = await this.httpClient.get(this.baseUrl + '/typeEvent').toPromise();
      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  Create(data: IEvent): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/typeEvent', data);
  }

  Edit(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let params = new HttpParams()
      .set('id', data.id)
      .set('name', data.name)
      .set('color', data.color)
      .set('campus_id', data.campus_id)

    console.log(params.toString());

    return this.httpClient.put(this.baseUrl + '/typeEvent/' + data.id, null, { headers: headers, params: params });
  }

  Delete(id: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    let params = new HttpParams().append('id', id)
    return this.httpClient.delete(this.baseUrl + '/typeEvent/' + id, { headers: headers, params: params });
  }
}
