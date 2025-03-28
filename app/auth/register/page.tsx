"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Check, Facebook, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Schéma de validation avec Zod
const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Le prénom doit contenir au moins 2 caractères",
  }),
  lastName: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide",
  }),
  password: z.string().min(8, {
    message: "Le mot de passe doit contenir au moins 8 caractères",
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les conditions d'utilisation",
  }),
});

export default function RegisterPage() {
  // Initialisation du formulaire
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  // Fonction de soumission
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Ici vous ajouterez la logique pour envoyer les données à votre API
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
            <h1 className="text-3xl font-bold">Créez votre compte</h1>
            <p className="text-gray-600 mt-2">
              Rejoignez notre communauté coopérative et bénéficiez de tous nos services
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input placeholder="Jean" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="Dupont" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="jean.dupont@exemple.com" {...field} />
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
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        J'accepte les{" "}
                        <Link href="/terms" className="text-[#00a455] hover:underline">
                          conditions d'utilisation
                        </Link>{" "}
                        et la{" "}
                        <Link href="/privacy" className="text-[#00a455] hover:underline">
                          politique de confidentialité
                        </Link>
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-[#00a455] to-[#1b7ab3] hover:opacity-90">
                Créer mon compte
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>

          <div className="text-center text-sm text-gray-600">
            Vous avez déjà un compte ?{" "}
            <Link href="/auth/login" className="font-medium text-[#00a455] hover:underline">
              Connectez-vous
            </Link>
          </div>
        </div>
      </div>

      {/* Colonne de droite - Visuel */}
      <div className="hidden lg:block bg-gradient-to-br from-[#1e2a36] to-[#2c3e50] relative">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white max-w-md">
            <h2 className="text-3xl font-bold mb-4">
              Rejoignez notre <span className="text-[#00a455]">communauté</span> coopérative
            </h2>
            <p className="text-gray-300 mb-8">
              En devenant membre, vous accédez à des opportunités d'investissement uniques, des crédits avantageux et une communauté engagée.
            </p>
            
            <div className="space-y-6">
              {[
                "Investissements avec rendements attractifs",
                "Accès à des crédits coopératifs",
                "Transparence totale sur vos projets",
                "Gouvernance participative"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="bg-[#00a455]/20 p-2 rounded-full">
                    <Check className="h-4 w-4 text-[#00a455]" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <div className="flex items-center gap-4">
                <div className="bg-[#00a455] p-3 rounded-full">
                  <Image 
                    src="/umurindi.jpeg" 
                    alt="Logo Umurindi" 
                    className='rounded-lg object-cover' 
                    width={40} 
                    height={40} 
                  />
                </div>
                <div>
                  <blockquote className="text-lg italic">"Grâce à Umurindi, j'ai pu financer mon entreprise à des taux imbattables."</blockquote>
                  <div className="mt-2 font-medium">Marie L., membre depuis 2021</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}