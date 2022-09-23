import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  constructor(private loginService: LoginService) {}

  public onLogout() {
    this.loginService.logout();
  }
}
