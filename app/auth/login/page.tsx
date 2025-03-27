'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useLogin } from '@/hooks/useLogin';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin, loading, error } = useLogin()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleLogin(email, password);
      
    } catch (err) {
      console.error("Erreur de connexion :", err);
      
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex items-center text-[#00a455] mb-8 hover:text-[#1b7ab3]">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à l'accueil
        </Link>
        <h2 className="text-center text-3xl font-bold text-gray-900">Se connecter à votre compte</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse e-mail
              </label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00a455] focus:border-[#00a455]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00a455] focus:border-[#00a455]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link href="/auth/forgot-password" className="font-medium text-[#00a455] hover:text-[#1b7ab3]">
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-[#00a455] text-white hover:bg-[#1b7ab3]"
              >
                {loading ? <Loader2 className='animate-spin flex justify-center items-center' /> : "Se connecter"}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Vous n'avez pas de compte ?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link href="/auth/register">
                <Button
                  variant="outline"
                  className="w-full border-[#00a455] text-[#00a455] hover:bg-[#00a455] hover:text-white"
                >
                  S'inscrire
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}