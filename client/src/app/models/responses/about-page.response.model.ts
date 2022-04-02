import { PageSection } from "./page-section.response.model";

export interface AboutPageResponse {
  message?: string;
  data?: AboutPageSections;
}

export interface AboutPageSections {
    aboutTitle: PageSection;
    aboutCardFirst: PageSection;
    aboutCardSecond: PageSection;
    aboutCardThird: PageSection;
}