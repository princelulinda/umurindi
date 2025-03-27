"use client"

import useAuthStore from "@/stores/authStore";
import { useState } from "react";

export default function useLogout() {
    const logout = useAuthStore((state) => state.logout);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogout = async () => {
        setLoading(true);
        setError(null);
        try {
            await logout();
        } catch (err: any) {
            setError(err.response?.data || 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    return { handleLogout, loading, error };
}