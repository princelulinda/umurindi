import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import apiClient from './apiClient';
import { redirect } from 'next/navigation';

const TOKEN_KEY = 'access';
const REFRESH_TOKEN_KEY = 'refresh';

export const getToken = (): string | null => {
    return Cookies.get(TOKEN_KEY) || null;
};

export const saveTokens = (accessToken: string, refreshToken: string): void => {
    Cookies.set(TOKEN_KEY, accessToken, { expires: 7, secure: true });
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { expires: 7, secure: true });
};

export const refreshToken = async (): Promise<string> => {
    console.log("REFRESH TOKEN", Cookies.get(REFRESH_TOKEN_KEY))
    console.log("access TOKEN", Cookies.get(TOKEN_KEY))
    const refresh_token = Cookies.get(REFRESH_TOKEN_KEY);
    if (!refresh_token) throw new Error('No refresh token available');

    try {
        const response = await apiClient.post('/auth/jwt/refresh/', { "refresh": refresh_token });
        saveTokens(response.data.access, response.data.refresh);
        console.log("RESPONSE FROM REFRESH TOKEN", response);

        return response.data.access;
    } catch (error) {
        Cookies.remove(TOKEN_KEY);
        Cookies.remove(REFRESH_TOKEN_KEY);
        redirect('/login')
        
        console.log("ERROR FROM REFRESH TOKEN", error);
        throw error;
    }
};

export const isTokenExpired = (token: string | null): boolean => {
    if (!token) return true;
    const { exp } = jwtDecode<{ exp: number }>(token);
    return Date.now() >= exp * 1000;
};
