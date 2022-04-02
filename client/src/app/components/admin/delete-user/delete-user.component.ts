import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { slideInOut } from 'src/app/animations/slide-in-out.animation';
import { User } from 'src/app/models/responses/users.response.model';
import { AccountService } from 'src/app/services/account.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
  animations: [
    slideInOut
  ]
})
export class DeleteUserComponent implements OnInit {
  show = true;
  @Input() user!: User;
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private accountService: AccountService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.show = false;
  }

  toggle() {
    this.show = !this.show;
  }

  confirm() {
    this.show = false;

    this.recaptchaV3Service.execute('removeUser').subscribe(token => {
      this.accountService.removeuser(this.user.id, token).subscribe(result => {
        this.toastService.openToast({ content: result.message, style: 'success' });
        this.refresh.emit();
      });
    });
  }
}
