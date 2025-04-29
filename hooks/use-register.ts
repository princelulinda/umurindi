"use client"

import useAuthStore from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

type Field = {
    name: string;
    label: string;
    type: string;
    placeholder: string;
};

type Step = {
    title: string;
    fields: Field[];
};

export function useRegister(steps: Step[]) {
    const form = useForm();
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const register = useAuthStore(state => state.register);
    const router = useRouter();

    const handleNext = () => {
        if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    };

    const handlePrevious = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const onSubmit = async (data: any) => {
        if (currentStep === steps.length - 1) {
            const { 
                email, 
                password, 
                confirmPassword, 
                dob, 
                nationality, 
                phone, 
                lastName, 
                firstName, 
                gender 
            } = data;

            if (password !== confirmPassword) {
                toast.error("Les mots de passe ne correspondent pas.");
                return;
            }

            if (password.length < 8) {
                toast.error("Le mot de passe doit contenir au moins 8 caractères.");
                return;
            }

            try {
                setLoading(true);
                await register(email, password, confirmPassword, dob, nationality, phone, lastName, firstName, gender);
                toast.success("Votre compte a été créé avec succès, vérifiez votre email");
                router.push("/auth/verify-email");
            } catch (error: any) {
                toast.error(error.message || "Une erreur est survenue lors de l'inscription");
            } finally {
                setLoading(false);
            }
        } else {
            handleNext();
        }
    };

    return {
        form,
        currentStep,
        steps,
        handleNext,
        handlePrevious,
        handleSubmit: onSubmit,
        loading
    };
}