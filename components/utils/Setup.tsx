'use client';

import { useVerify } from '@/hooks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Setup() {
	useVerify();

	return (
		<ToastContainer 
			position="bottom-right"
			autoClose={3000} // Temps en millisecondes (3s)
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme="light"
		/>
	);
}
