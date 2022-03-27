import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  resetForm!: FormGroup;

  constructor(
    private navigationService: NavigationService,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private toastService: ToastService,
    private recaptchaV3Service: ReCaptchaV3Service
  ) { }

  ngOnInit(): void {
    this.navigationService.setNavViewPreference(true);

    this.resetForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      recaptchaToken: [null]
    })
  }

  ngOnDestroy(): void {
    this.navigationService.setNavViewPreference(false);
  }

  requestReset() {
    this.recaptchaV3Service.execute('requestReset').subscribe(token => {
      this.resetForm.patchValue({ recaptchaToken: token });

      this.authService.requestReset(this.resetForm.value).subscribe(result => {
        this.resetForm.reset();
        this.toastService.openToast({ content: result.message, style: 'success', timeout: 12000 })
      });
    });
  }
}
