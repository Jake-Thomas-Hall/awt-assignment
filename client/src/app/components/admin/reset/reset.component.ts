import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.navigationService.setNavViewPreference(true);

    this.resetForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]]
    })
  }

  ngOnDestroy(): void {
    this.navigationService.setNavViewPreference(false);
  }

  requestReset() {
    this.authService.requestReset(this.resetForm.value.email).subscribe(result => {
      this.resetForm.reset();
      this.toastService.openToast({ content: result.message, style: 'success', timeout: 12000 })
    });
  }
}
