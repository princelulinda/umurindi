'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useActivateQuery } from '@/redux/features/authApiSlice';
import { toast } from 'react-toastify';

interface Props {
	params: {
		uidb64: string;
		token: string;
	};
}

export default function Page({ params }: Props) {
	const { uidb64, token } = params;
  
	const router = useRouter();
	const { data, error, isLoading } = useActivateQuery({ uidb64, token });



	useEffect(() => {
		if (data) {
			toast.success('Compte activé avec succès');
			router.push('/auth/login');
		} else if (error) {
			toast.error("Échec de l'activation du compte: lien expiré ou invalide");
			router.push('/auth/login');
		}
	}, [data, error, router]);

	return (
		<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<h1 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
					{isLoading ? 'Activation de votre compte en cours...' : 'Redirection...'}
				</h1>
			</div>
		</div>
	);
}