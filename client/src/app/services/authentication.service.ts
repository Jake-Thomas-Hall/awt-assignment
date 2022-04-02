import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoginRequest } from '../models/requests/login.request.model';
import { ResetConfirmRequest } from '../models/requests/reset-confirm.request.model';
import { ResetRequest } from '../models/requests/reset.request.model';
import { LoginTokenResponse } from '../models/responses/login-token.response.model';
import { LoginResponse } from '../models/responses/login.response.model';
import { MessageReponse } from '../models/responses/message.response.model';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _userId: number = 0;

  constructor(private http: HttpClient) {
  }

  subscribeToAuthenticated() {
    return this.authenticated$.asObservable();
  }

  authenticatedStatusSnapshot() {
    return this.authenticated$.getValue();
  }

  login(loginOptions: LoginRequest) {
    const body = new HttpParams()
      .set('email', loginOptions.email)
      .set('password', loginOptions.password)
      .set('recaptchaToken', loginOptions.recaptchaToken);

    return this.http.post<LoginTokenResponse>(`${AppConfigService.settings.apiEndpoint}auth/login`, body);
  }

  loginToken(recaptchaToken: string) {
    const params = new HttpParams()
      .set('recaptchaToken', recaptchaToken);

    return this.http.get<LoginResponse>(`${AppConfigService.settings.apiEndpoint}auth/login`, { params: params});
  }

  requestReset(resetRequest: ResetRequest) {
    const body = new HttpParams()
    .set('email', resetRequest.email)
    .set('recaptchaToken', resetRequest.recaptchaToken);

    return this.http.post<MessageReponse>(`${AppConfigService.settings.apiEndpoint}auth/reset`, body);
  }

  confirmReset(request: ResetConfirmRequest) {
    const body = new HttpParams()
    .set('token', request.token)
    .set('newPassword', request.newPassword)
    .set('newPasswordConfirm', request.newPasswordConfirm)
    .set('recaptchaToken', request.recaptchaToken);

    return this.http.post<MessageReponse>(`${AppConfigService.settings.apiEndpoint}auth/reset-confirm`, body);
  }

  logout(recaptchaToken: string) {
    const body = new HttpParams()
    .set('recaptchaToken', recaptchaToken);;

    return this.http.post<MessageReponse>(`${AppConfigService.settings.apiEndpoint}auth/logout`, body);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  setLoginStatus(status: boolean) {
    this.authenticated$.next(status);
  }

  get userId() {
    return this._userId;
  }

  set userId(userId: number) {
    this._userId = userId;
  }
}
