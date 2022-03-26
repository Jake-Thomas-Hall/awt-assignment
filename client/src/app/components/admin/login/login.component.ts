import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.navigationService.setNavViewPreference(true);

    this.loginForm = this.fb.group({
      email: [null, Validators.email],
      password: [null]
    })
  }

  ngOnDestroy(): void {
    this.navigationService.setNavViewPreference(false);
  }

  login(): void {
    this.toastService.openToast({ content: 'Login successful', style: 'success' });
  }
}
