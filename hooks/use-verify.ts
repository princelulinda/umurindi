'use client'

import { useEffect } from "react";
import useAuthStore from "@/stores/authStore";

export default function useVerify() {
    const { verify, finishInitialLoad } = useAuthStore();

    useEffect(() => {
        verify().finally(() => finishInitialLoad());
    }, []);
}
