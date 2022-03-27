export interface ResetConfirmRequest {
    token: string;
    newPassword: string;
    newPasswordConfirm: string;
    recaptchaToken: string;
}