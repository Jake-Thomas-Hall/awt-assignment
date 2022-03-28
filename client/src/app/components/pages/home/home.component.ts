import { Component, OnInit } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { HomePageResponse } from 'src/app/models/responses/home-page.response.model';
import { PageContentService } from 'src/app/services/page-content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pageContent: HomePageResponse = { message: undefined, data: undefined };

  constructor(
    private pageContentService: PageContentService,
    private recaptchaV3Service: ReCaptchaV3Service
    ) { }

  ngOnInit(): void {
    this.recaptchaV3Service.execute('homePageLoad').subscribe(token => {
      this.pageContentService.getHomePageContent(token).subscribe(result => {
        this.pageContent = result;
      });
    });
  }

}
