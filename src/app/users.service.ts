import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Users {

  uri = 'http://localhost:8080/addUser';

  constructor(private http: HttpClient) { }

  addUser(firstname, lastname) {
    const obj = {
      firstname: firstname,
      lastname: lastname,
      
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
      .subscribe(res => console.log('Done'));
  }
}
