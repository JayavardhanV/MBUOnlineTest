import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  apiURL = 'https://reqres.in/api/unknown'

  constructor(private http: HttpClient) { }

  public getAllResources(reqPayload: any): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL);
  }
}
