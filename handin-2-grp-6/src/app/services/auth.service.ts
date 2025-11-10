import { ApiBaseUrl } from "@/app/_data/api-base";
import type { LoginRequest, LoginResponse } from "@/app/types/auth";

export class AuthService {
    private static readonly TOKEN_KEY = "jwt";
    private static readonly LOGIN_ENDPOINT = `${ApiBaseUrl}Users/login`;
    private static readonly USERS_ENDPOINT = `${ApiBaseUrl}Users`;

    static async login(credentials: LoginRequest): Promise<LoginResponse> {
        const response = await fetch(this.LOGIN_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "wrong pswd or mail lol");
        }

        return response.json();
    }

    static saveToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    static getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    static logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    static async fetchUsers(token: string): Promise<unknown> {
        const response = await fetch(this.USERS_ENDPOINT, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            }
        });

        if (!response.ok) {
            throw new Error("error");
        }

        return response.json();
    }
}
