import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnquiryEmailRequest } from '../models/requests/enquiry-email.request.model';
import { UpdatePageContentRequest } from '../models/requests/update-page-content.request.model';
import { AboutPageResponse } from '../models/responses/about-page.response.model';
import { ContactPageResponse } from '../models/responses/contact-page.response.model';
import { HomePageResponse } from '../models/responses/home-page.response.model';
import { MessageReponse } from '../models/responses/message.response.model';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class PageContentService {

  constructor(private httpClient: HttpClient) { }

  updatePageContent(updateOptions: UpdatePageContentRequest) {
    const body = new HttpParams()
      .set('id', updateOptions.id)
      .set('content', updateOptions.content)
      .set('recaptchaToken', updateOptions.recaptchaToken);

    return this.httpClient.post<MessageReponse>(`${AppConfigService.settings.apiEndpoint}pages/content/update`, body);
  }

  sendEnquiryEmail(enquiryOptions: EnquiryEmailRequest) {
      const body = new HttpParams()
      .set('name', enquiryOptions.name)
      .set('email', enquiryOptions.email)
      .set('message', enquiryOptions.message)
      .set('recaptchaToken', enquiryOptions.recaptchaToken)
      .set('company', enquiryOptions.company!);

    return this.httpClient.post<MessageReponse>(`${AppConfigService.settings.apiEndpoint}pages/content/enquiry-email`, body);
  }

  getHomePageContent() {
    return this.httpClient.get<HomePageResponse>(`${AppConfigService.settings.apiEndpoint}pages/home`);
  }

  getContactPageContent() {
    return this.httpClient.get<ContactPageResponse>(`${AppConfigService.settings.apiEndpoint}pages/contact`);
  }

  getAboutPageContent() {
    return this.httpClient.get<AboutPageResponse>(`${AppConfigService.settings.apiEndpoint}pages/about`);
  }
}
