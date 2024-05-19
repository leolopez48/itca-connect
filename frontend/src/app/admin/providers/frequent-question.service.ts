import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFrequentQuestion } from '../../../model/event.interface';

@Injectable({
  providedIn: 'root'
})
export class FrequentQuestionService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  Index(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'frequentQuestion');
  }

  Create(data: IFrequentQuestion): Observable<any> {
    return this.httpClient.post(this.baseUrl + 'frequentQuestion',data);
  }

  Edit(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let params = new HttpParams()
      .set('id', data.id)
      .set('question', data.question)
      .set('answer', data.answer)

    console.log(params.toString()); 

    return this.httpClient.put(this.baseUrl + 'frequentQuestion/' + data.id, null, { headers: headers, params: params });
  }

  Delete(id: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    let params = new HttpParams().append('id', id)
    return this.httpClient.delete(this.baseUrl + 'frequentQuestion/' + id, { headers: headers, params: params });
  }
}
