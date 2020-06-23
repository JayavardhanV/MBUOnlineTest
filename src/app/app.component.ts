import { Component, OnChanges, DoCheck } from '@angular/core';
import { User } from './models/User/users.model';
import { AuthenticationService } from './services/Authenticate/authenticate.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {
  title = 'MBUTest';
  currentUser: boolean

  constructor(private authenticationService: AuthenticationService) {
  }

  ngDoCheck(){
    this.currentUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser'))).value ? true :false
  }
}
