import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { slideInOut } from 'src/app/animations/slide-in-out.animation';
import { User } from 'src/app/models/responses/users.response.model';
import { AccountService } from 'src/app/services/account.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
  animations: [
    slideInOut
  ]
})
export class UpdateUserComponent implements OnInit {
  show = true;
  updateUserForm!: FormGroup;

  @Input() user!: User;
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.updateUserForm = this.fb.group({
      userId: [null],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      recaptchaToken: [null]
    });

    this.updateUserForm.patchValue({ userId: this.user.id, firstName: this.user.firstName, lastName: this.user.lastName });
  }

  updateUser() {
    this.show = false;

    this.recaptchaV3Service.execute('addUser').subscribe(token => {
      this.updateUserForm.patchValue({ recaptchaToken: token });

      this.accountService.updateDetails(this.updateUserForm.value).subscribe(result => {
        this.toastService.openToast({ content: result.message, style: 'success' });
        this.refresh.emit();
      });
    });
  }

  close() {
    this.show = false;
  }
}
