import { PageSection } from "./page-section.response.model";

export interface ServicesPageResponse {
  message?: string;
  data?: ServicesPageSections;
}

export interface ServicesPageSections {
    servicesTitle: PageSection;
    servicesCardFirst: PageSection;
    servicesCardSecond: PageSection;
    servicesCardThird: PageSection;
    servicesCardFourth: PageSection;
    servicesCardFifth: PageSection;
}