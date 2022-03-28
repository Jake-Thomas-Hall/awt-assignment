export interface EnquiryEmailRequest {
    name: string;
    email: string;
    message: string;
    recaptchaToken: string;
    company?: string;
}