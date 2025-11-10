export interface JwtPayload {
    Name: string;
    Role: string;
    UserId: string;
    GroupId: string;
}

export const decodeJwt = (token: string): JwtPayload | null => {
    try {
        const payload = token.split('.')[1];
        const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
        return JSON.parse(decoded);
    } catch {
        return null;
    }
};

export const getUserRole = (token: string): string | null => {
    return decodeJwt(token)?.Role || null;
};
