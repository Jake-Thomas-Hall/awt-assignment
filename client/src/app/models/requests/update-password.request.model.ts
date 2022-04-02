export interface UpdatePasswordRequest {
    userId: number;
    newPassword: string;
    newPasswordConfirm: string;
    currentPassword: string;
    recaptchaToken: string;
}