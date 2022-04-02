import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { slideInOut } from 'src/app/animations/slide-in-out.animation';
import { CustomValidators } from 'src/app/models/custom-validators.model';
import { AccountService } from 'src/app/services/account.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  animations: [
    slideInOut
  ]
})
export class AddUserComponent implements OnInit {
  show = false;
  addUserForm!: FormGroup;

  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      newPassword: [null, Validators.required],
      newPasswordConfirm: [null, Validators.required],
      recaptchaToken: [null]
    }, { validators: [CustomValidators.fieldsMatch('newPassword', 'newPasswordConfirm')]});
  }

  addUser() {
    this.show = false;

    this.recaptchaV3Service.execute('addUser').subscribe(token => {
      this.addUserForm.patchValue({ recaptchaToken: token });

      this.accountService.addUser(this.addUserForm.value).subscribe(result => {
        this.toastService.openToast({ content: result.message, style: 'success' });
        this.refresh.emit();
        this.addUserForm.reset();
      });
    });
  }

  close() {
    this.addUserForm.reset();
    this.show = false;
  }

  toggle() {
    this.show = !this.show;
  }
}
