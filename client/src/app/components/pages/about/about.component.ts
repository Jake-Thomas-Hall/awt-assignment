import { Component, OnInit } from '@angular/core';
import { AboutPageResponse, AboutPageSections } from 'src/app/models/responses/about-page.response.model';
import { PageContentService } from 'src/app/services/page-content.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  pageContent: AboutPageResponse = { message: undefined, data: undefined };

  constructor(
    private pageContentService: PageContentService,
  ) { }

  ngOnInit(): void {
    this.pageContentService.getAboutPageContent().subscribe(result => {
      this.pageContent = result;
    });
  }

}
