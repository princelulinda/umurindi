"use client";

import { redirect, usePathname } from "next/navigation";
import useAuthStore from "@/stores/authStore";
import { Spinner } from "../common";

interface Props {
    children: React.ReactNode;
}

export default function RequireAuth({ children }: Props) {
    const pathname = usePathname();


    const { isAuthenticated, isLoading } = useAuthStore();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center mx-auto">
                <Spinner lg />
            </div>
        );
    }

    // Si l'utilisateur n'est pas authentifié et qu'il n'est pas déjà sur la page de login
    if (!isAuthenticated && pathname !== '/auth/login') {
        redirect('/auth/login');
    }

    return <>{children}</>;
}
