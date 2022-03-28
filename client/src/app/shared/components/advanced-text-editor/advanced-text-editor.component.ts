import { AfterViewInit, Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { BehaviorSubject } from 'rxjs';
import { PageSection } from 'src/app/models/responses/page-section.response.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PageContentService } from 'src/app/services/page-content.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-advanced-text-editor',
  templateUrl: './advanced-text-editor.component.html',
  styleUrls: ['./advanced-text-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdvancedTextEditorComponent implements AfterViewInit{
  editor!: ClassicEditor;
  @ViewChild('editor') editorElement!: ElementRef;
  editing = false;

  _pageSection = new BehaviorSubject<PageSection | undefined>(undefined);
  @Input() set pageSection(value: PageSection | undefined) {
    this._pageSection.next(value);
  };

  constructor(
    public authService: AuthenticationService,
    private pageContentService: PageContentService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private toastService: ToastService) { }
  
  ngAfterViewInit(): void {
    ClassicEditor.create(this.editorElement.nativeElement, {
      toolbar: {
        removeItems: ['mediaEmbed', 'uploadImage']
      }
    }).then((editor: ClassicEditor) => {
      this.editor = editor;
      this._pageSection.subscribe(value => {
        if (value) {
          this.editor.setData(value.content);
        }
      });
    });
  }

  edit(): void {
    this.editing = true;
  }

  save(): void {
    this.editing = false;
    this.recaptchaV3Service.execute('updatePageContent').subscribe(token => {
      const pageSection = this._pageSection.getValue()!;
      pageSection.content = this.editor.getData();

      this.pageContentService.updatePageContent({ id: pageSection.id, content: pageSection.content, recaptchaToken: token }).subscribe(result => {
        this.toastService.openToast({ content: result.message, style: 'success' });
        this._pageSection.next(pageSection);
      });
    });
  }

  cancel(): void {
    this.editing = false;
    this.editor.setData(this._pageSection.getValue()?.content!);
  }
}
