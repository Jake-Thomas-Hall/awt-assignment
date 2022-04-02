import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { slideInOut } from 'src/app/animations/slide-in-out.animation';
import { CustomValidators } from 'src/app/models/custom-validators.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-reset-confirm',
  templateUrl: './reset-confirm.component.html',
  styleUrls: ['./reset-confirm.component.scss'],
  animations: [
    slideInOut
  ]
})
export class ResetConfirmComponent implements OnInit {
  resetConfirmForm!: FormGroup;

  constructor(
    private navigationService: NavigationService,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private recaptchaV3Service: ReCaptchaV3Service
  ) { }

  ngOnInit(): void {
    this.navigationService.setNavViewPreference(true);

    this.resetConfirmForm = this.fb.group({
      token: [null],
      newPassword: [null, [Validators.required]],
      newPasswordConfirm: [null, [Validators.required]],
      recaptchaToken: [null]
    }, { validators: [CustomValidators.fieldsMatch('newPassword', 'newPasswordConfirm')] })

    this.activatedRoute.queryParams.subscribe(params => {
      this.resetConfirmForm.patchValue(params);
    });
  }

  ngOnDestroy(): void {
    this.navigationService.setNavViewPreference(false);
  }

  resetConfirm(): void {
    this.recaptchaV3Service.execute('resetConfirm').subscribe(token => {
      this.resetConfirmForm.patchValue({ recaptchaToken: token });

      this.authService.confirmReset(this.resetConfirmForm.value).subscribe(result => {
        this.toastService.openToast({ content: result.message, style: 'success', timeout: 10000 });
        this.authService.removeToken();
        this.authService.setLoginStatus(false);
        this.authService.userId = 0;
        this.router.navigate(['/admin/login']);
      });
    });
  }
}
