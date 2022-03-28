import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { BehaviorSubject } from 'rxjs';
import { PageSection } from 'src/app/models/responses/page-section.response.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PageContentService } from 'src/app/services/page-content.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-simple-text-editor',
  templateUrl: './simple-text-editor.component.html',
  styleUrls: ['./simple-text-editor.component.scss']
})
export class SimpleTextEditorComponent implements OnInit {
  editing = false;
  editTextForm!: FormGroup;
  editedText: string = '';

  _pageSection = new BehaviorSubject<PageSection | undefined>(undefined);
  @Input() set pageSection(value: PageSection | undefined) {
    this._pageSection.next(value);
  };

  constructor(
    private fb: FormBuilder,
    private recaptchaV3Service: ReCaptchaV3Service,
    private toastService: ToastService,
    private pageContentService: PageContentService,
    public authService: AuthenticationService
    ) { }

  ngOnInit(): void {
    this.editTextForm = this.fb.group({
      content: [null, Validators.required]
    })

    this._pageSection.subscribe(value => {
      if (value) {
        this.editTextForm.patchValue({
          content: value.content
        })
      }
    });
  }

  edit() {
    this.editing = true;
  }

  onEditKeydown($event: KeyboardEvent) {
    return $event.key !== 'Enter' && $event.key !== 'Tab';
  }

  save() {
    this.editing = false;
    const pageSection = this._pageSection.getValue()!;
    pageSection.content = this.editTextForm.get('content')?.value;
    this._pageSection.next(pageSection);
    
    this.recaptchaV3Service.execute('updatePageContent').subscribe(token => {
      this.pageContentService.updatePageContent({ id: pageSection.id, content: pageSection.content, recaptchaToken: token }).subscribe(result => {
        this.toastService.openToast({ content: result.message, style: 'success' });
      });
    });
  }

  cancel() {
    this.editing = false;
    this.editTextForm.patchValue({ content: this._pageSection.getValue()?.content! });
  }
}
