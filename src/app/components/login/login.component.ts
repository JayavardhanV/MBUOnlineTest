import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service'
import { User } from '../../models/User/users.model'
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../services/notification/notification.service'
import { AuthenticationService } from '../../services/Authenticate/authenticate.service'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  userList: User[] = []
  errorMessage: string
  isError: boolean = false

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.clearUserCache();

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      checkbox:[false]
    });
    // console.log(this.route)

    this.getListOfUsers(1)
  }

  clearUserCache() {
    let loginUser = this.authenticationService.currentUserValue
    if (loginUser)
      if (window.confirm("Are you sure to exist the current user(" + loginUser[0].first_name + ' ' + loginUser[0].last_name + ")"))
        localStorage.removeItem("currentUser")
      else
        this.router.navigateByUrl(this.route.snapshot.queryParams['returnUrl'])
  }

  get f() { return this.loginForm.controls; }

  getListOfUsers(page) {
    this.loginService.getAllUsers(page).subscribe(
      response => {
        response["data"].map(user => { this.userList.push(user) })

        if (response["total_pages"] > page)
          this.getListOfUsers(page + 1)
      }
    )
  }
  close() {
    this.isError = false
  }
  onSubmit() {
    this.submitted = true;
    // this.notificationService.clear()
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.loginService.authenticateUser(this.f.username.value, this.f.password.value)
      .then(
        response => {
          if (response["token"] !== undefined && response["token"] !== '' && response["token"] !== null) {
            localStorage.setItem("currentUser", JSON.stringify(this.userList.filter(user => user.email === this.f.username.value)))
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.loading = false
            this.isError = true;
            this.errorMessage = "Unable to validate User. Please contact Admin"
            this.submitted = false;
            this.loginForm = this.formBuilder.group({
              password: ['', Validators.required]
            });
          }
        },
        error => {
          // this.notificationService.error(error)
          console.error(error);
          this.loading = false
          this.isError = true;
          this.errorMessage = error["error"]["error"];
          this.submitted = false;
          this.loginForm = this.formBuilder.group({
            password: ['', Validators.required]
          });
        }
      )
  }
}
