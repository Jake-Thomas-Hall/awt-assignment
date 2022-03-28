import { PageSection } from "./page-section.response.model";

export interface HomePageResponse {
  message?: string;
  data?: HomePageSections;
}

export interface HomePageSections {
    homeCardFirst: PageSection;
    homeCardSecond: PageSection;
}