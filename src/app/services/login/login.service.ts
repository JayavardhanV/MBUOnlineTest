import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DEFAULT_PACKAGE_URL_PROVIDER } from '@angular/platform-browser-dynamic/src/compiler_factory';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private usersApiUrl = "https://reqres.in/api/users"
  private loginApiUrl = "https://reqres.in/api/login"
  constructor(private http: HttpClient) { }

  public getAllUsers(page: any): Observable<any[]> {
    return this.http.get<any[]>(this.usersApiUrl + '?page=' + page)
  }

  public async authenticateUser(username: string, password: string) {
    var payload = {
      "email": username,
      "password": password
    }
    return await this.http.post(this.loginApiUrl,  payload).toPromise()
  }

}
