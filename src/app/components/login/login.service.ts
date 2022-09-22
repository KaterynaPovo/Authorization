import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  user = new Subject<User>();
  
  constructor(private http: HttpClient) {}

  public signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAyGaw38yiP8IyrrhUMvUTK97GdC48cc9c',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }

  public signIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAyGaw38yiP8IyrrhUMvUTK97GdC48cc9c',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
}
