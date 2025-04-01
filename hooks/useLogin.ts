"use client"

import useAuthStore from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';


export function useLogin() {
    const login = useAuthStore((state) => state.login);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter()
    const loadUser = useAuthStore((state) => state.loadUser)

    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            await login(email, password);
            loadUser()
            router.push("/dashboard")
            toast.success("Connecté")
        } catch (err: any) {
            console.log("Erreur", err)
            setError(err.response?.data || 'Une erreur est survenue');
            toast.error(err.message)
        } finally {
            setLoading(false);
        }
    };

    return { handleLogin, loading, error };
}