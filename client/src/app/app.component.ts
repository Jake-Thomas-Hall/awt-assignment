import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { AuthenticationService } from './services/authentication.service';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private toastService: ToastService,
    private recaptchaV3Service: ReCaptchaV3Service) {
  }

  ngOnInit(): void {
    // If there is a token, attempt to auto login upon page load
    if (this.authService.getToken()) {
      this.recaptchaV3Service.execute('loginToken').subscribe(token => {
        this.authService.loginToken(token).subscribe({
          next: response => {
            // If login is successful display message and set auth status into auth service
            this.authService.setLoginStatus(response.data.authStatus);
            this.toastService.openToast({ content: 'Login succesful', style: 'success', timeout: 10000 });
          },
          error: (response: HttpErrorResponse) => {
            // If token login fails, this likely means password was reset, invalidating existing tokens
            // Therefore removes token from local storage
            switch (response.status) {
              case 403:
                this.authService.removeToken();
                break;
              default:
                break;
            }
          }
        });
      })
    }
  }
}
