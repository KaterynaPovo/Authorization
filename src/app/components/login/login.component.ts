import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public title = 'Authorization';
  public error = '';
  public isLoginMode = true;
  //public error: string = null;

  constructor(private loginService: LoginService, private router: Router) {}

  public onSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObservable: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObservable = this.loginService.signIn(email, password);
    } else {
      authObservable = this.loginService.signUp(email, password);
    }

    authObservable.subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/profile']);
      },
      (errorResponse) => {
        console.log(errorResponse);
        switch (errorResponse.error.error.message) {
          case 'EMAIL_EXISTS':
            this.error = 'The email address is already exists!';
            break;
          case 'EMAIL_NOT_FOUND':
            this.error = 'The email address is not found!';
            break;
          case 'INVALID_PASSWORD':
            this.error = 'The password is invalid!';
            break;
        }
        // this.error = "Something's gone wrong!";
      }
    );
    form.reset();
  }

  // public logout() {
  //   this.user.next(null);
  // }

  ngOnInit(): void {}
}
