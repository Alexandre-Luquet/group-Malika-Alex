import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { getLocaleDateFormat } from '@angular/common';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  public userList: any ;
  public groupList: any;
  constructor(private http: HttpClient) {
    // console.log(JSON.stringify(this.userList))
    console.log('Hello user');
    this.getData().then((data) => {
      console.log(data)
      this.userList = data
      this.getGroup().then((group)=>{
        console.log(group)
        this.groupList = group
      })
    });
   
  }
  
  user = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl('')
  });
  // userList = this.getData(); 
  private apiUrl = 'http://localhost:8080/getUsers';
  data: any;
  group: any;
 
 

  getData() {
    return this.http.get(this.apiUrl).toPromise()
  }

  getGroup(){
    return this.http.get("http://localhost:8080/addGroup").toPromise()
  }

  submitmyForm() {    
      console.log(this.user.value);
      let userData = this.user.value;

    this.http.post("http://localhost:8080/addUser", { userData }, { responseType: 'text' }).subscribe((data) => { console.log(data)});
    return (window.location.reload())
    
    
  }
  showDiv() {
    document.getElementById('welcomeDiv').style.display = "block";

  }


  
  // getData() { 
  //   let userArray;
  //   userArray = this.http.get('http://localhost:8080/getUsers').subscribe(result => { console.log(result)});
  //   console.log("BUMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMmmm")
  //   console.log(userArray)
  //   return userArray;  
  // }
  

  ngOnInit() {
    this.getData();
  }
}


