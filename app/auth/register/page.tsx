"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRegister } from "@/hooks/use-register";
import useFeaturesStore from "@/stores/features";
import { useEffect } from "react";

const stepss = [
  {
    title: "Informations personnelles",
    fields: [
      { name: "firstName", label: "Prénom", type: "text", placeholder: "Entrez votre prénom" },
      { name: "lastName", label: "Nom", type: "text", placeholder: "Entrez votre nom" },
      { name: "email", label: "Adresse e-mail", type: "email", placeholder: "Entrez votre e-mail" },
      { name: "dob", label: "Date de naissance", type: "date", placeholder: "Entrez votre date de naissance" }, // Champ Date de naissance
    ],
  },
  {
    title: "Informations de contact",
    fields: [
      { name: "phone", label: "Numéro de téléphone", type: "tel", placeholder: "Entrez votre numéro de téléphone" },
      { name: "gender", label: "Genre", type: "select", placeholder: "Choisissez votre genre" },
      { name: "nationality", label: "Nationalité", type: "select", placeholder: "Choisissez votre nationalité" }, // Champ Nationalité
    ],
  },
  {
    title: "Sécurité",
    fields: [
      { name: "password", label: "Mot de passe", type: "password", placeholder: "Créez un mot de passe" },
      { name: "confirmPassword", label: "Confirmer le mot de passe", type: "password", placeholder: "Confirmez votre mot de passe" },
    ],
  },
];

export default function RegisterPage() {
  const { loadNationality, nationalities, isLoading } = useFeaturesStore();
  const {
    formData,
    currentStep,
    steps,
    handleInputChange,
    handleNext,
    handlePrevious,
    handleSubmit,
    loading
  } = useRegister(stepss); // Utiliser le hook

  useEffect(() => {
    loadNationality();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex items-center text-[#00a455] mb-8 hover:text-[#1b7ab3]">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à l'accueil
        </Link>
        <h2 className="text-center text-xl font-bold text-gray-900">Commencer à générer de revenus</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mb-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Étape {currentStep + 1} sur {steps.length}: {steps[currentStep].title}
                </span>
              </div>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {steps[currentStep].fields.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <div className="mt-1">
                  {field.type === "select" ? (
                    <select
                      id={field.name}
                      name={field.name}
                      required
                      value={formData[field.name] || ""}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00a455] focus:border-[#00a455]"
                    >
                      {field.name === "gender"
                        ? <>
                          <option value="">Choisissez votre genre</option>
                          <option value="Masculin">Masculin</option>
                          <option value="Feminin">Féminin</option>
                        </>
                        : <>
                          <option value="">Choisissez votre nationalité</option>
                          {nationalities?.map((nationality) => (

                            <option value={`${nationality.id}`}>{nationality.libelle}</option>
                          ))}

                        </>}

                      {/* Ajoutez d'autres options ici */}
                    </select>
                  ) : (
                    <Input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00a455] focus:border-[#00a455]"
                    />
                  )}
                </div>
              </div>
            ))}

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
              >
                {currentStep === steps.length - 1 ? <>{loading ? <Loader2 className="animate-spin flex justify-center items-center" /> :"Créer un compte"}</> : <>Suivant <ArrowRight className="h-4 w-4 ml-2" /></>}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Vous avez déjà un compte ?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="w-full border-[#00a455] text-[#00a455] hover:bg-[#00a455] hover:text-white"
                >
                  Se connecter
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
