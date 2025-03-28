"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useAuthStore from "@/stores/authStore";

interface Props {
	params: {
		uidb64: string;
		token: string;
	};
}

export default function Page({ params }: Props) {
	const { uidb64, token } = params;
	const router = useRouter();

	const activate = useAuthStore((state) => state.activate);
	const { isLoading } = useAuthStore()


	useEffect(() => {
		const activatingUser = async () => {
			try {
				await activate(uidb64, token);
				toast.success("Compte activé avec succès");
				router.push("/auth/login");
			} catch (error) {
				toast.error("Échec de l'activation du compte: lien expiré ou invalide");
				router.push("/auth/login");
			}
		}

		activatingUser()

	}, [uidb64, token, activate, router]);

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					{isLoading ? "Activation de votre compte en cours..." : "Redirection..."}
				</h1>
			</div>
		</div>
	);
}
