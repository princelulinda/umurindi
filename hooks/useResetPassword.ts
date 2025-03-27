"use client"

import useAuthStore from "@/stores/authStore";
import { useState } from "react";

export function useResetPassword() {
    const resetPassword = useAuthStore((state) => state.resetPassword);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleResetPassword = async (email: string) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            await resetPassword(email);
            setSuccess(true);
        } catch (err: any) {
            setError(err.response?.data || 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    return { handleResetPassword, loading, error, success };
}
