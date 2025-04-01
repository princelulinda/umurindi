import { create } from 'zustand'
import { AuthResponse, User } from '@/types/auth'

import { getToken, saveTokens } from '@/api/authService'
import apiClient from '@/api/apiClient'

import Cookies from 'js-cookie'

interface AuthState {
    user: User | null;
    data: any | null;
    error: any | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    loadUser: () => Promise<void>;
    setAuth: (auth: boolean) => void;
    login: (email: string, password: string) => void;
    register: (email: string, password: string, confirmPassword: string, dob: string, nationality: string, phone: string, lastName: string, firstName: string, gender:string) => void;
    logout: () => Promise<void>;
    verify: () => Promise<void>;
    finishInitialLoad: () => void;
    activate: (uidb64: string, token: string) => void;
    resetPassword: (email: string) => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    data: null,
    error: null,

    finishInitialLoad: () => set({ isLoading: false }),
    setAuth: (auth) => set({ isAuthenticated: auth }),

    loadUser: async () => {
        try {
            const token = getToken();
            if (token) {
                const response = await apiClient.get<User>("/auth/users/me/");
                set({ user: response.data, isAuthenticated: true });
            }
        } catch (error) {
            set({ user: null, isAuthenticated: false });
            console.log("ERROR LOAD USER", error)
        } finally {
            set({ isLoading: false });
        }
    },

    login: async (email, password) => {
        try {
            const response = await apiClient.post<AuthResponse>("/auth/jwt/create/", { email, password });
            saveTokens(response.data.access, response.data.refresh);
            set({  isAuthenticated: true });
        } catch (error: any) {
            console.log("ERROR LOGIN", error);

            // Vérifier si c'est une erreur de l'API et extraire le message
            const errorMessage =
                error.response?.data?.detail === "No active account found with the given credentials"
                    ? "Aucun compte actif trouvé avec ces identifiants."
                    : "Une erreur s'est produite. Vérifiez vos informations et réessayez.."
            throw new Error(errorMessage);
        }
    },

    logout: async () => {
        set({ user: null, isAuthenticated: false });

        try {
            await apiClient.post('/auth/logout/');
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        } finally {
            // Suppression des cookies un par un
            Cookies.remove('access');
            Cookies.remove('refresh');
        }
    },

    resetPassword: async (email) => {
        try {
            await apiClient.post("/auth/users/reset_password/", { email });
            console.log("RESET PASSWORD SUCCESS");
        } catch (error) {
            console.log("ERROR RESET PASSWORD", error);
            throw error;
        }
    },

    activate: async (uidb64, token) => {
        try{
            const response = await apiClient.get(`/activate/${uidb64}/${token}/`)
            set({ data: response.data, isLoading: false });

        }catch (error: any) {
            console.log(error)
            set({ error, isLoading: false });
            
        } finally {
            set({ isLoading: false });
        }
    },
    verify: async () => {
        try {
            const token = await getToken();
            if (!token) throw new Error("No token available");

            const res = await apiClient.post("/auth/jwt/verify/", {
                "token": token
            });
            console.log("GETTING VERIFY OKAY")
            // Si la vérification réussit, on met l'utilisateur comme authentifié
            set({ isAuthenticated: true });
        } catch (error) {
            set({ isAuthenticated: false });
            console.log(error)
        } finally {
            set({ isLoading: false });
        }
    },

    // Register method
    register: async (email, password, confirmPassword, dob, nationality, phone, lastName, firstName, gender) => {

        try {
            const response = await apiClient.post<AuthResponse>("/membres/", {
                nom: firstName,
                prenom: lastName,
                sexe: gender,
                date_naissance: dob,
                nationalite: nationality,
                user: {
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    phone,
                    password,
                    re_password: confirmPassword
                }
             });
        } catch (error: any) {
            console.log("ERROR REGISTER", error);

            const errorMessage =
                error.response?.data?.message
                    ? error.response?.data?.message
                    : "Une erreur s'est produite lors de l'enregistrement. Veuillez réessayer.";
            throw new Error(errorMessage);
        }
    },
}))

export default useAuthStore;