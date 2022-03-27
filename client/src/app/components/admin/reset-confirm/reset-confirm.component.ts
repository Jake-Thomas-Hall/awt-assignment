import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.navigationService.setNavViewPreference(true);

    this.resetConfirmForm = this.fb.group({
      token: [null],
      newPassword: [null, [Validators.required]],
      newPasswordConfirm: [null, [Validators.required]]
    }, { validators: [CustomValidators.fieldsMatch('newPassword', 'newPasswordConfirm')] })

    this.activatedRoute.queryParams.subscribe(params => {
      this.resetConfirmForm.patchValue(params);
    });
  }

  ngOnDestroy(): void {
    this.navigationService.setNavViewPreference(false);
  }

  resetConfirm(): void {
    this.authService.confirmReset(this.resetConfirmForm.value).subscribe(result => {
      this.toastService.openToast({ content: result.message, style: 'success', timeout: 10000 });
      this.router.navigate(['/']);
    });
  }
}
