'use server';

import { cookies } from 'next/headers';
import type { LoginRequest, LoginResponse } from "@/app/_types/auth";
import { ApiBaseUrl } from "@/app/_consts/api-consts";
import type { User } from "@/app/_types/user";
import { decodeJwt } from "@/app/myworkouts/utils/jwt";

const TOKEN_KEY = "jwt";
const LOGIN_ENDPOINT = `${ApiBaseUrl}Users/login`;
const USERS_ENDPOINT = `${ApiBaseUrl}Users`;

export async function loginAction(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(LOGIN_ENDPOINT, {
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

    const data: LoginResponse = await response.json();

    // Save token in cookie
    const cookieStore = await cookies();
    cookieStore.set(TOKEN_KEY, data.jwt, {
        httpOnly: false, // Set to false so client can read it for development
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return data;
}

export async function logoutAction(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(TOKEN_KEY);
}

export async function getTokenAction(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get(TOKEN_KEY)?.value;
}

export async function getCurrentUserAction(): Promise<User | null> {
    const token = await getTokenAction();

    if (!token) {
        return null;
    }

    const payload = decodeJwt(token);
    if (!payload) {
        return null;
    }

    try {
        const response = await fetch(`${USERS_ENDPOINT}/${payload.UserId}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            }
        });

        if (!response.ok) {
            return null;
        }

        return response.json();
    } catch (error) {
        return null;
    }
}

export async function isAuthenticatedAction(): Promise<boolean> {
    const token = await getTokenAction();
    return !!token;
}
