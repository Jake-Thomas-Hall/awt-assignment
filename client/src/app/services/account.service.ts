import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddUserRequest } from '../models/requests/add-user.request.model';
import { UpdateDetailsRequest } from '../models/requests/update-details.request.model';
import { UpdatePasswordRequest } from '../models/requests/update-password.request.model';
import { MessageReponse } from '../models/responses/message.response.model';
import { UserResponse } from '../models/responses/user.response.model';
import { UsersResponse } from '../models/responses/users.response.model';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  // Updates user password
  updatePassword(updatePasswordOptions: UpdatePasswordRequest) {
    const body = new HttpParams()
      .set('userId', updatePasswordOptions.userId)
      .set('newPassword', updatePasswordOptions.newPassword)
      .set('newPasswordConfirm', updatePasswordOptions.newPasswordConfirm)
      .set('currentPassword', updatePasswordOptions.currentPassword)
      .set('recaptchaToken', updatePasswordOptions.recaptchaToken);

    return this.http.post<MessageReponse>(`${AppConfigService.settings.apiEndpoint}admin/account/password`, body);
  }

  // Updates user details
  updateDetails(updateDetailsOptions: UpdateDetailsRequest) {
    const body = new HttpParams()
      .set('userId', updateDetailsOptions.userId)
      .set('firstName', updateDetailsOptions.firstName)
      .set('lastName', updateDetailsOptions.lastName)
      .set('recaptchaToken', updateDetailsOptions.recaptchaToken);

    return this.http.post<MessageReponse>(`${AppConfigService.settings.apiEndpoint}admin/account/details`, body);
  }

  // Gets current user's details (relies on token http interceptor to set header necessary for this to work.)
  getUserDetails() {
    return this.http.get<UserResponse>(`${AppConfigService.settings.apiEndpoint}admin/account/details`);
  }

  // Add a new user
  addUser(addUserOptions: AddUserRequest) {
    const body = new HttpParams()
      .set('firstName', addUserOptions.firstName)
      .set('lastName', addUserOptions.lastName)
      .set('email', addUserOptions.email)
      .set('newPassword', addUserOptions.newPassword)
      .set('newPasswordConfirm', addUserOptions.newPasswordConfirm)
      .set('recaptchaToken', addUserOptions.recaptchaToken);

    return this.http.post<MessageReponse>(`${AppConfigService.settings.apiEndpoint}admin/users/add`, body);
  }

  // Remove specified user (note that backend has a hardcoded check to prevent removal of default admin account, just in case)
  removeuser(userId: number, recaptchaToken: string) {
    const body = new HttpParams()
      .set('userId', userId)
      .set('recaptchaToken', recaptchaToken);

    return this.http.post<MessageReponse>(`${AppConfigService.settings.apiEndpoint}admin/users/remove`, body)
  }

  // Return array of users, paginates via page number (page number should start from 1, not zero!)
  getAllUsers(page: number) {
    const params = new HttpParams()
      .set('page', page);

    return this.http.get<UsersResponse>(`${AppConfigService.settings.apiEndpoint}admin/users/list`, { params: params });
  }
}
