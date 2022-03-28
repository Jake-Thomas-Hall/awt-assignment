import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdatePageContentRequest } from '../models/requests/update-page-content.request.model';
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

  getHomePageContent(recaptchaToken: string) {
    const params = new HttpParams()
      .set('recaptchaToken', recaptchaToken);

    return this.httpClient.get<HomePageResponse>(`${AppConfigService.settings.apiEndpoint}pages/home`, {params: params});
  }
}
