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
    private pageContentService: PageContentService
    ) { }

  ngOnInit(): void {
    this.pageContentService.getHomePageContent().subscribe(result => {
      this.pageContent = result;
    });
  }
}
