export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    jwt: string;
}

export interface AuthError {
    message: string;
    status?: number;
    details?: unknown;
}
