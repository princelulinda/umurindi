"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Facebook, Linkedin, Mail, Loader2, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useLogin } from '@/hooks/useLogin';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide",
  }),
  password: z.string().min(8, {
    message: "Le mot de passe doit contenir au moins 8 caractères",
  }),
  remember: z.boolean().optional(),
});

export default function LoginPage() {
  const { handleLogin, loading } = useLogin();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await handleLogin(values.email, values.password);
      toast.success("Connexion réussie !");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Échec de la connexion. Veuillez vérifier vos identifiants.");
      console.error("Erreur de connexion :", error);
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Colonne de gauche - Formulaire */}
      <div className="flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2 mb-8">
              <Image 
                src="/umurindi.jpeg" 
                alt="Logo Umurindi" 
                className='rounded-lg object-cover' 
                width={40} 
                height={40} 
              />
              <span className="text-2xl font-extrabold bg-gradient-to-r from-[#00a455] to-[#1b7ab3] bg-clip-text text-transparent">
                Umurindi
              </span>
            </Link>
            <h1 className="text-3xl font-bold">Connectez-vous</h1>
            <p className="text-gray-600 mt-2">
              Accédez à votre espace membre et gérez vos investissements
            </p>
          </div>

  

          {/* Formulaire */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="jean.dupont@exemple.com" 
                        type="email"
                        autoComplete="email"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        autoComplete="current-password"
                        {...field} 
                      />
                    </FormControl>
                    <div className="flex justify-between items-center">
                      <FormField
                        control={form.control}
                        name="remember"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              Se souvenir de moi
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      <Link href="/auth/forgot-password" className="text-sm text-[#00a455] hover:underline">
                        Mot de passe oublié ?
                      </Link>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-[#00a455] to-[#1b7ab3] hover:opacity-90"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connexion en cours...
                  </>
                ) : (
                  <>
                    Se connecter
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="text-center text-sm text-gray-600">
            Vous n'avez pas de compte ?{" "}
            <Link href="/auth/register" className="font-medium text-[#00a455] hover:underline">
              Inscrivez-vous
            </Link>
          </div>
        </div>
      </div>

      {/* Colonne de droite - Visuel */}
      <div className="hidden lg:block bg-gradient-to-br from-[#1e2a36] to-[#2c3e50] relative">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white max-w-md">
            <h2 className="text-3xl font-bold mb-4">
              Bienvenue dans votre <span className="text-[#00a455]">espace membre</span>
            </h2>
            <p className="text-gray-300 mb-8">
              Accédez à toutes les fonctionnalités réservées à nos membres et suivez vos investissements en temps réel.
            </p>
            
            <div className="space-y-6 mb-12">
              {[
                "Tableau de bord personnalisé",
                "Historique de vos transactions",
                "Documents fiscaux disponibles",
                "Support prioritaire"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="bg-[#00a455]/20 p-2 rounded-full">
                    <Check className="h-4 w-4 text-[#00a455]" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <div className="flex items-center gap-4">
                <div className="bg-[#00a455] p-3 rounded-full">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Besoin d'aide ?</h3>
                  <p className="text-gray-300 text-sm">
                    Contactez notre équipe à <span className="text-[#00a455]">support@umurindi.com</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}