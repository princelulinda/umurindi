"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Check, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useRegister } from "@/hooks/use-register";
import useFeaturesStore from "@/stores/features";
import { useEffect } from "react";
import Image from "next/image";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const steps = [
  {
    title: "Informations personnelles",
    fields: ["firstName", "lastName", "email", "dob"],
  },
  {
    title: "Informations de contact",
    fields: ["phone", "gender", "nationality"],
  },
  {
    title: "Sécurité",
    fields: ["password", "confirmPassword"],
  }
];

export default function RegisterPage() {
  const { loadNationality, nationalities, isLoading } = useFeaturesStore();
  const {
    form,
    currentStep,
    steps: registerSteps,
    handleNext,
    handlePrevious,
    loading,
    handleSubmit
  } = useRegister(steps); 

  useEffect(() => {
    loadNationality();
  }, [loadNationality]);

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
              Étape {currentStep + 1} sur {registerSteps.length}: {registerSteps[currentStep].title}
            </p>
          </div>

          {/* Barre de progression */}
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-[#00a455] h-2.5 rounded-full" 
              style={{ width: `${((currentStep + 1) / registerSteps.length) * 100}%` }}
            ></div>
          </div>

          {/* Formulaire */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => {
             handleSubmit(data);
            })} className="space-y-6">
              {currentStep === 0 && (
                <>
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
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date de naissance</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {currentStep === 1 && (
                <>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="+257 76984140" 
                            type="tel"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Genre</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez votre genre" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Masculin">Masculin</SelectItem>
                            <SelectItem value="Feminin">Féminin</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nationality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nationalité</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez votre nationalité" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {nationalities?.map((nationality) => (
                              <SelectItem key={nationality.id} value={nationality.id}>
                                {nationality.libelle}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {currentStep === 2 && (
                <>
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
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmez le mot de passe</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="••••••••" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <div className="flex justify-between space-x-4">
                {currentStep > 0 && (
                  <Button
                    type="button"
                    onClick={handlePrevious}
                    variant="outline"
                    className="flex-1 border-[#00a455] text-[#00a455] hover:bg-[#00a455] hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Précédent
                  </Button>
                )}
                <Button
                  type="submit"
                  className="flex-1 bg-[#00a455] text-white hover:bg-green-500"
                  disabled={loading}
                >
                  {currentStep === registerSteps.length - 1 ? (
                    loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Inscription...
                      </>
                    ) : (
                      "Créer un compte"
                    )
                  ) : (
                    <>
                      Suivant
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
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
              Rejoignez la communauté <span className="text-[#00a455]">Umurindi</span>
            </h2>
            <p className="text-gray-300 mb-8">
              Créez votre compte pour accéder à toutes les fonctionnalités et commencer à générer des revenus.
            </p>
            
            <div className="space-y-6 mb-12">
              {[
                "Gestion simplifiée de vos investissements",
                "Accès à des opportunités exclusives",
                "Tableau de bord personnalisé",
                "Support dédié 24/7"
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
                  <h3 className="font-bold mb-1">Des questions ?</h3>
                  <p className="text-gray-300 text-sm">
                    Contactez-nous à <span className="text-[#00a455]">support@umurindi.com</span>
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