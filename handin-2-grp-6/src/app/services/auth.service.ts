import type {LoginRequest, LoginResponse} from "@/app/_types/auth";
import {ApiBaseUrl} from "@/app/_consts/api-consts";
import {redirect} from "next/navigation";
import {cookies} from 'next/headers';
import {ReadonlyRequestCookies} from "next/dist/server/web/spec-extension/adapters/request-cookies";

export class AuthService {
    private static readonly TOKEN_KEY = "jwt";
    private static readonly LOGIN_ENDPOINT = `${ApiBaseUrl}Users/login`;
    private static CookieStore: ReadonlyRequestCookies | undefined;

    constructor() {
        cookies().then(store => AuthService.CookieStore = store);
    }

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
        AuthService.CookieStore?.set(this.TOKEN_KEY, token, {sameSite: "lax"});
    }

    static getToken(): string | undefined {
        return AuthService.CookieStore?.get(this.TOKEN_KEY)?.value;
    }

    static logout(): void {
        AuthService.CookieStore?.delete(this.TOKEN_KEY);
    }

    static requireAuth() {
        const token = AuthService.getToken();

        setTimeout(() => {
            if (token) return;

            redirect("/login");
        }, 3000);

    }
}
