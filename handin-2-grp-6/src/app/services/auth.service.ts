import type {LoginRequest, LoginResponse} from "@/app/_types/auth";
import type { User } from "@/app/_types/user";
import { loginAction, logoutAction, getTokenAction, getCurrentUserAction } from "@/app/actions/auth";

export class AuthService {
    static async login(credentials: LoginRequest): Promise<LoginResponse> {
        return await loginAction(credentials);
    }

    static async logout(): Promise<void> {
        await logoutAction();
    }

    static async getToken(): Promise<string | undefined> {
        return await getTokenAction();
    }

    // For client-side synchronous token access (used in navbar, etc)
    static getTokenSync(): string | undefined {
        // This is a workaround - check if cookie exists client-side
        if (typeof document !== 'undefined') {
            const name = 'jwt=';
            const decodedCookie = decodeURIComponent(document.cookie);
            const ca = decodedCookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
        }
        return undefined;
    }

    static async getCurrentUser(): Promise<User | null> {
        return await getCurrentUserAction();
    }
}
