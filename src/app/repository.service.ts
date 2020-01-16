import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RepositoryQueryResult } from './Models/RepositoryQueryResult';
import { HttpResult } from './Models/HttpResult';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  private url = 'https://fmg-empregos-hire.herokuapp.com/api/repository';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getRepositories(): Observable<HttpResult<RepositoryQueryResult>> {
    return this.http.get<HttpResult<RepositoryQueryResult>>(this.url, this.httpOptions);
  }

}
