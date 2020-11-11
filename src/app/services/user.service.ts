import { Injectable } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  auth = false;
  private SERVER_URL = environment.SERVER_URL;
  private user;
  authState$ = new BehaviorSubject<boolean>(this.auth);
  userData$ = new BehaviorSubject<SocialUser | ResponseModel>(null);
  loginMessage$ = new BehaviorSubject<string>(null);
  userRole: number;

  constructor(private authService: SocialAuthService,
    private httpClient: HttpClient) { 
      authService.authState.subscribe((user) => {
        if (user != null) {
          this.auth = true;
          this.authState$.next(this.auth);
          this.userData$.next(this.user);
        }
      });
    }

    // Login User with Email and Password
    loginUser(email: string, password: string) {
      this.httpClient.post(`${this.SERVER_URL}/auth/login`, {email, password})
      .subscribe((data: ResponseModel) => {
        this.auth = data.auth;
        this.authState$.next(this.auth);
        this.userData$.next(data);
      });
    }

    // Google Authentication
    googleLogin(): void {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    logout() {
      this.authService.signOut();
      this.auth = false;
      this.authState$.next(this.auth);
    }

    

}

export interface ResponseModel {
  token: string;
  auth: boolean;
  email: string;
  username: string;
  fname: string;
  lname: string;
  photoUrl: string;
  userId: number;
  type: string;
  role: number;
}