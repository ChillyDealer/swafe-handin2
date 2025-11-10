import type {LoginRequest, LoginResponse} from "@/app/_types/auth";
import {ApiBaseUrl} from "@/app/_consts/api-consts";
import Cookies from 'js-cookie';
import {redirect} from "next/navigation";

export class AuthService {
    private static readonly TOKEN_KEY = "jwt";
    private static readonly LOGIN_ENDPOINT = `${ApiBaseUrl}Users/login`;

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
        Cookies.set(this.TOKEN_KEY, token, {sameSite: "lax"});
    }

    static getToken(): string | undefined {
        return Cookies.get(this.TOKEN_KEY);
    }

    static logout(): void {
        Cookies.remove(this.TOKEN_KEY);
    }

    static requireAuth() {
        if (AuthService.getToken()) return;

        redirect("/login");
    }
}
