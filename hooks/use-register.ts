"use client"

import useAuthStore from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

// Définir les types pour les champs du formulaire et les étapes
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

type FormData = Record<string, string>;

export function useRegister(steps: Step[]) {
    // État pour la gestion des données du formulaire
    const [formData, setFormData] = useState<FormData>({});
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const register = useAuthStore(state => state.register);
    const router = useRouter()
    // Fonction pour gérer le changement des valeurs du formulaire
    const handleInputChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Fonction pour avancer à l'étape suivante
    const handleNext = () => {
        if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    };

    // Fonction pour revenir à l'étape précédente
    const handlePrevious = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    // Fonction pour soumettre le formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (currentStep === steps.length - 1) {
            console.log("Formulaire soumis :", formData);
            const { email, password, confirmPassword, dob, nationality, phone, lastName, firstName, gender } = await formData
            if (password !== confirmPassword) {
                toast.error("Les mots de passe ne correspondent pas.")
                return
            }

            if(password.length < 8) {
                toast.error("Le mot de passe doit contenir au moins 8 caractères.")
                return
            }

            if(confirmPassword.length < 8) {
                toast.error("Le mot de passe doit contenir au moins 8 caractères.")
                return
            }

            try {
                setLoading(true);
                await register(email, password, confirmPassword, dob, nationality, phone, lastName, firstName, gender);
                router.push("/auth/verify-email")
                toast.success("Votre compte a été crée avec succes, vérifier votre email")
            } catch (error: any) {
                // Gérer l'erreur, afficher un message d'erreur
                console.error(error.message);
                toast.error(error.message)
            } finally {
                setLoading(false);
            }
        } else {
            handleNext();
        }
    };

    return {
        formData,
        currentStep,
        steps,
        handleInputChange,
        handleNext,
        handlePrevious,
        handleSubmit,
        loading
    };
}
