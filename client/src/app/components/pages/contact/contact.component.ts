import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { slideInOut } from 'src/app/animations/slide-in-out.animation';
import { ContactPageResponse } from 'src/app/models/responses/contact-page.response.model';
import { PageContentService } from 'src/app/services/page-content.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [
    slideInOut
  ]
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  pageContent: ContactPageResponse = { message: undefined, data: undefined };

  constructor(
    private fb: FormBuilder,
    private pageContentService: PageContentService,
    private toastService: ToastService,
    private recaptchaV3Service: ReCaptchaV3Service
  ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      company: [null],
      message: [null, Validators.required],
      recaptchaToken: [null]
    });

    this.pageContentService.getContactPageContent().subscribe(result => {
      this.pageContent = result;
    });
  }

  sendEmail() {
    this.recaptchaV3Service.execute('sendEnquiryEmail').subscribe(token => {
      this.contactForm.patchValue({ recaptchaToken: token });

      this.pageContentService.sendEnquiryEmail(this.contactForm.value).subscribe(response => {
        this.toastService.openToast({ content: response.message, style: 'success' });
        this.contactForm.reset();
      });
    });
  }

  resetForm() {
    this.contactForm.reset();
  }
}
