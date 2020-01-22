import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(`${environment.apiUrl}/getUsers`).toPromise()
  }

  getGroup() {
    return this.http.get(`${environment.apiUrl}/addGroup`).toPromise()
  }

  submitmyForm(userData) {
    console.log(userData)
    return this.http.post(`${environment.apiUrl}/addUser`, { userData }, { responseType: 'text' }).toPromise();
  }
}