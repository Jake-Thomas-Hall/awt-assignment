import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { slideInOut } from 'src/app/animations/slide-in-out.animation';
import { CustomValidators } from 'src/app/models/custom-validators.model';
import { UserDetails, UserResponse } from 'src/app/models/responses/user.response.model';
import { AccountService } from 'src/app/services/account.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss'],
  animations: [
    slideInOut
  ]
})
export class ManageAccountComponent implements OnInit, OnDestroy {
  updateDetailsForm!: FormGroup;
  updatePasswordForm!: FormGroup;
  userDetailsResponse!: UserDetails;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private authService: AuthenticationService,
    private accountService: AccountService,
    private router: Router,
    private navigationService: NavigationService
    ) { 

  }

  ngOnInit(): void {
    this.navigationService.setNavViewPreference(true);

    this.updateDetailsForm = this.fb.group({
      userId: [this.authService.userId],
      recaptchaToken: [null],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required]
    });

    this.updatePasswordForm = this.fb.group({
      userId: [this.authService.userId],
      recaptchaToken: [null],
      currentPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      newPasswordConfirm: [null, Validators.required]
    }, { validators: [CustomValidators.fieldsMatch('newPassword', 'newPasswordConfirm')]});

    this.accountService.getUserDetails().subscribe(response => {
      this.updateDetailsForm.patchValue(response.data);
      this.userDetailsResponse = response.data;
    });
  }

  updateDetails() {
    this.recaptchaV3Service.execute('updateUserDetails').subscribe(token => {
      this.updateDetailsForm.patchValue({ recaptchaToken: token });

      this.accountService.updateDetails(this.updateDetailsForm.value).subscribe(result => {
        this.toastService.openToast({ content: result.message, style: 'success', timeout: 10000 });
      });
    });
  }

  updatePassword() {
    this.recaptchaV3Service.execute('updateUserDetails').subscribe(token => {
      this.updatePasswordForm.patchValue({ recaptchaToken: token });

      this.accountService.updatePassword(this.updatePasswordForm.value).subscribe(result => {
        this.toastService.openToast({ content: result.message, style: 'success', timeout: 10000 });
        this.authService.userId = 0;
        this.authService.setLoginStatus(false);
        this.authService.removeToken();
        this.router.navigate(['/admin/login']);
      });
    });
  }

  ngOnDestroy(): void {
    this.navigationService.setNavViewPreference(false);
  }
}
