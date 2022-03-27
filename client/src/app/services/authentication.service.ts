import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoginRequest } from '../models/requests/login.request.model';
import { ResetConfirmRequest } from '../models/requests/reset-confirm.request.model';
import { LoginTokenResponse } from '../models/responses/login-token.response.model';
import { LoginResponse } from '../models/responses/login.response.model';
import { MessageReponse } from '../models/responses/message.response.model';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  subscribeToAuthenticated() {
    return this.authenticated$.asObservable();
  }

  login(loginOptions: LoginRequest) {
    const body = new HttpParams()
      .set('email', loginOptions.email!)
      .set('password', loginOptions.password!);

    return this.http.post<LoginTokenResponse>(`${AppConfigService.settings.apiEndpoint}auth/login`, body, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  loginToken() {
    return this.http.get<LoginResponse>(`${AppConfigService.settings.apiEndpoint}auth/login`);
  }

  requestReset(email: string) {
    const body = new HttpParams()
    .set('email', email);

    return this.http.post<MessageReponse>(`${AppConfigService.settings.apiEndpoint}auth/reset`, body);
  }

  confirmReset(request: ResetConfirmRequest) {
    const body = new HttpParams()
    .set('token', request.token)
    .set('newPassword', request.newPassword)
    .set('newPasswordConfirm', request.newPasswordConfirm);

    return this.http.post<MessageReponse>(`${AppConfigService.settings.apiEndpoint}auth/reset-confirm`, body);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  setLoginStatus(status: boolean) {
    this.authenticated$.next(status);
  }
}
