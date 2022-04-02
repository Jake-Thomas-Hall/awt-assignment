export interface AddUserRequest {
    firstName: number;
    lastName: string;
    email: string;
    newPassword: string;
    newPasswordConfirm: string;
    recaptchaToken: string;
}