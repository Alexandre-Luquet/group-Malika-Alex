import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { getLocaleDateFormat } from '@angular/common';
import { environment } from 'src/environments/environment';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public userList: any;
  public groupList: any;
  data: any;
  group: any;

  user = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl('')
  });

  constructor(private http: HttpClient, private userService: UsersService) {
    console.log('Hello user');
    userService.getData().then((data) => {
      console.log(data)
      this.userList = data
      userService.getGroup().then((group) => {
        console.log(group)
        this.groupList = group
      })
    });

  }

  // ngOnChanges(changes: SimpleChanges) {
  //   this.user = changes.user.currentValue
  // }
  // ngOnInit() { // calls the function getData from the users.service as soon as the page is loaded.
  // }

  



  submitmyForm() {  // calls the function submitmyForm from the users.service to send the form data to the database.
    console.log(this.user.value);
    let userData = this.user.value;

    this.userService.submitmyForm(userData).then(() => {
      this.userService.getData();
      

       console.log("Les données ont bien été envoyées");
       });

  }

  showDiv() { // function to display the group datacell
    document.getElementById('welcomeDiv').style.display = "block";

  }
}


