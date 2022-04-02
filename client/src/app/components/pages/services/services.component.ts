import { Component, OnInit } from '@angular/core';
import { ServicesPageResponse } from 'src/app/models/responses/services-page.response.model';
import { PageContentService } from 'src/app/services/page-content.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  pageContent: ServicesPageResponse = { message: undefined, data: undefined };

  constructor(
    private pageContentService: PageContentService
  ) { }

  ngOnInit(): void {
    this.pageContentService.getServicePageContent().subscribe(result => {
      this.pageContent = result;
    });
  }

}
