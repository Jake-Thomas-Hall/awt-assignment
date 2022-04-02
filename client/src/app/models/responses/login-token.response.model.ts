export interface LoginTokenResponse {
    message: string;
    data: { 
        token: string,
        userId: number
    };
}