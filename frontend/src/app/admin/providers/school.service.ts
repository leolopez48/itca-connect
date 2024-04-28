import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICampus, IEvent, ISchool } from '../../../model/event.interface';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  Index(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'school');
  }

  Create(data: ISchool): Observable<any> {
    return this.httpClient.post(this.baseUrl + 'school',data);
  }

  Edit(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let params = new HttpParams()
      .set('id', data.id)
      .set('name', data.name)
      .set('campus', data.campus)

    console.log(params.toString()); 

    return this.httpClient.put(this.baseUrl + 'school/' + data.id, null, { headers: headers, params: params });
  }

  Delete(id: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    let params = new HttpParams().append('id', id)
    return this.httpClient.delete(this.baseUrl + 'school/' + id, { headers: headers, params: params });
  }
}
