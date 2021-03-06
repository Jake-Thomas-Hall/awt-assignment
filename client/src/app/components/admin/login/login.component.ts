import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;

  constructor(
    private navigationService: NavigationService,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private toastService: ToastService,
    private recaptchaV3Service: ReCaptchaV3Service
  ) { }

  ngOnInit(): void {
    this.navigationService.setNavViewPreference(true);

    this.loginForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      recaptchaToken: [null]
    })

    this.authService.subscribeToAuthenticated().subscribe(authenticated => {
      if (authenticated) {
        this.router.navigate(['/']);
      }
    })
  }

  ngOnDestroy(): void {
    this.navigationService.setNavViewPreference(false);
  }

  login(): void {
    this.recaptchaV3Service.execute('login').subscribe((token: string) => {
      this.loginForm.patchValue({recaptchaToken: token});

      this.authService.login(this.loginForm.value).subscribe(result => {
        this.toastService.openToast({ content: 'Login successful', style: 'success', timeout: 10000 });
        this.authService.setToken(result.data.token);
        this.authService.setLoginStatus(true);
        this.authService.userId = result.data.userId;
        this.router.navigate(['/']);
      });
    });
  }
}
