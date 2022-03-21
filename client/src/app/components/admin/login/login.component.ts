import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;

  constructor(
    private navigationService: NavigationService,
    private fb: FormBuilder
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
}
