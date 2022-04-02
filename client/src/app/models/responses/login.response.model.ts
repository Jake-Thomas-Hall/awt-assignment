export interface LoginResponse {
    message: string;
    data: { 
        authStatus: boolean,
        userId: number
    };
}