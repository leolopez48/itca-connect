import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDetailCampusPlace } from '../../../model/event.interface';

@Injectable({
  providedIn: 'root'
})
export class DetailCampusPlaceService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  Index(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'detailCampusPlace');
  }

  Create(data: IDetailCampusPlace): Observable<any> {
    return this.httpClient.post(this.baseUrl + 'detailCampusPlace',data);
  }

  Edit(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let params = new HttpParams()
      .set('id', data.id)
      .set('latitude', data.latitude)
      .set('longitude', data.longitude)
      .set('place_type_id', data.place_type_id)
      .set('campus_id', data.campus_id);

    console.log(params.toString()); 

    return this.httpClient.put(this.baseUrl + 'detailCampusPlace/' + data.id, null, { headers: headers, params: params });
  }

  Delete(id: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    let params = new HttpParams().append('id', id)
    return this.httpClient.delete(this.baseUrl + 'detailCampusPlace/' + id, { headers: headers, params: params });
  }
}