import { PageSection } from "./page-section.response.model";

export interface ContactPageResponse {
  message?: string;
  data?: ContactPageSections;
}

export interface ContactPageSections {
    contactTitle: PageSection;
    contactCardFirst: PageSection;
    contactCardSecondTitle: PageSection;
    contactCardThirdTitle: PageSection;
}