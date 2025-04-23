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
  } = useRegister(stepss); 

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

// "use client"

// import { useState, useEffect } from 'react';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ArrowLeft, ArrowRight, Loader2, Check, Mail } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { toast } from 'react-toastify';
// import { useRouter } from 'next/navigation';
// import useFeaturesStore from "@/stores/features";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// // Schéma de validation global
// const formSchema = z.object({
//   firstName: z.string().min(1, "Le prénom est requis"),
//   lastName: z.string().min(1, "Le nom est requis"),
//   email: z.string().email("Veuillez entrer une adresse email valide"),
//   dob: z.string().min(1, "La date de naissance est requise"),
//   phone: z.string().min(1, "Le numéro de téléphone est requis"),
//   gender: z.string().min(1, "Le genre est requis"),
//   nationality: z.string().min(1, "La nationalité est requise"),
//   password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
//   confirmPassword: z.string().min(1, "La confirmation est requise"),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Les mots de passe ne correspondent pas",
//   path: ["confirmPassword"],
// });

// const steps = [
//   {
//     title: "Informations personnelles",
//     fields: ["firstName", "lastName", "email", "dob"],
//   },
//   {
//     title: "Informations de contact",
//     fields: ["phone", "gender", "nationality"],
//   },
//   {
//     title: "Sécurité",
//     fields: ["password", "confirmPassword"],
//   }
// ];

// export default function RegisterPage() {
//   const { loadNationality, nationalities } = useFeaturesStore();
//   const [currentStep, setCurrentStep] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       dob: "",
//       phone: "",
//       gender: "",
//       nationality: "",
//       password: "",
//       confirmPassword: "",
//     },
//   });

//   useEffect(() => {
//     loadNationality();
//   }, []);

//   const handleNext = async () => {
//     const isValid = await form.trigger(steps[currentStep].fields as any, { shouldFocus: true });
    
//     if (isValid) {
//       setCurrentStep((prev) => prev + 1);
//     }
//   };

//   const handlePrevious = () => {
//     setCurrentStep((prev) => prev - 1);
//   };

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     if (currentStep < steps.length - 1) {
//       await handleNext();
//       return;
//     }

//     try {
//       setLoading(true);
//       // Ici vous ajouteriez votre logique d'inscription
//       // await registerUser(values);
//       toast.success("Inscription réussie !");
//       router.push("/auth/login");
//     } catch (error) {
//       toast.error("Erreur lors de l'inscription");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
//       {/* Colonne de gauche - Formulaire */}
//       <div className="flex flex-col items-center justify-center p-8">
//         <div className="w-full max-w-md space-y-8">
//           <div className="text-center">
//             <Link href="/" className="inline-flex items-center gap-2 mb-8">
//               <Image 
//                 src="/umurindi.jpeg" 
//                 alt="Logo Umurindi" 
//                 className='rounded-lg object-cover' 
//                 width={40} 
//                 height={40} 
//               />
//               <span className="text-2xl font-extrabold bg-gradient-to-r from-[#00a455] to-[#1b7ab3] bg-clip-text text-transparent">
//                 Umurindi
//               </span>
//             </Link>
//             <h1 className="text-3xl font-bold">Créez votre compte</h1>
//             <p className="text-gray-600 mt-2">
//               Étape {currentStep + 1} sur {steps.length}: {steps[currentStep].title}
//             </p>
//           </div>

//           {/* Barre de progression */}
//           <div className="w-full bg-gray-200 rounded-full h-2.5">
//             <div 
//               className="bg-[#00a455] h-2.5 rounded-full" 
//               style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
//             ></div>
//           </div>

//           {/* Formulaire */}
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//               {currentStep === 0 && (
//                 <>
//                   <FormField
//                     control={form.control}
//                     name="firstName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Prénom</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Jean" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="lastName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Nom</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Dupont" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="email"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Email</FormLabel>
//                         <FormControl>
//                           <Input 
//                             placeholder="jean.dupont@exemple.com" 
//                             type="email"
//                             {...field} 
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="dob"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Date de naissance</FormLabel>
//                         <FormControl>
//                           <Input type="date" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </>
//               )}

//               {currentStep === 1 && (
//                 <>
//                   <FormField
//                     control={form.control}
//                     name="phone"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Téléphone</FormLabel>
//                         <FormControl>
//                           <Input 
//                             placeholder="+257 76984140" 
//                             type="tel"
//                             {...field} 
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="gender"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Genre</FormLabel>
//                         <Select onValueChange={field.onChange} value={field.value}>
//                           <FormControl>
//                             <SelectTrigger>
//                               <SelectValue placeholder="Sélectionnez votre genre" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent>
//                             <SelectItem value="Masculin">Masculin</SelectItem>
//                             <SelectItem value="Feminin">Féminin</SelectItem>
//                           </SelectContent>
//                         </Select>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="nationality"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Nationalité</FormLabel>
//                         <Select onValueChange={field.onChange} value={field.value}>
//                           <FormControl>
//                             <SelectTrigger>
//                               <SelectValue placeholder="Sélectionnez votre nationalité" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent>
//                             {nationalities?.map((nationality) => (
//                               <SelectItem key={nationality.id} value={nationality.id}>
//                                 {nationality.libelle}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </>
//               )}

//               {currentStep === 2 && (
//                 <>
//                   <FormField
//                     control={form.control}
//                     name="password"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Mot de passe</FormLabel>
//                         <FormControl>
//                           <Input 
//                             type="password" 
//                             placeholder="••••••••" 
//                             {...field} 
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="confirmPassword"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Confirmez le mot de passe</FormLabel>
//                         <FormControl>
//                           <Input 
//                             type="password" 
//                             placeholder="••••••••" 
//                             {...field} 
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </>
//               )}

//               <div className="flex justify-between space-x-4">
//                 {currentStep > 0 && (
//                   <Button
//                     type="button"
//                     onClick={handlePrevious}
//                     variant="outline"
//                     className="flex-1 border-[#00a455] text-[#00a455] hover:bg-[#00a455] hover:text-white"
//                   >
//                     <ArrowLeft className="h-4 w-4 mr-2" />
//                     Précédent
//                   </Button>
//                 )}
//                 <Button
//                   type={currentStep === steps.length - 1 ? "submit" : "button"}
//                   onClick={currentStep < steps.length - 1 ? handleNext : undefined}
//                   className="flex-1 bg-[#00a455] text-white hover:bg-green-500"
//                   disabled={loading}
//                 >
//                   {currentStep === steps.length - 1 ? (
//                     loading ? (
//                       <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         Inscription...
//                       </>
//                     ) : (
//                       "Créer un compte"
//                     )
//                   ) : (
//                     <>
//                       Suivant
//                       <ArrowRight className="ml-2 h-4 w-4" />
//                     </>
//                   )}
//                 </Button>
//               </div>
//             </form>
//           </Form>

//           <div className="text-center text-sm text-gray-600">
//             Vous avez déjà un compte ?{" "}
//             <Link href="/auth/login" className="font-medium text-[#00a455] hover:underline">
//               Connectez-vous
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Colonne de droite - Visuel */}
//       <div className="hidden lg:block bg-gradient-to-br from-[#1e2a36] to-[#2c3e50] relative">
//         <div className="absolute inset-0 flex items-center justify-center p-12">
//           <div className="text-white max-w-md">
//             <h2 className="text-3xl font-bold mb-4">
//               Rejoignez la communauté <span className="text-[#00a455]">Umurindi</span>
//             </h2>
//             <p className="text-gray-300 mb-8">
//               Créez votre compte pour accéder à toutes les fonctionnalités et commencer à générer des revenus.
//             </p>
            
//             <div className="space-y-6 mb-12">
//               {[
//                 "Gestion simplifiée de vos investissements",
//                 "Accès à des opportunités exclusives",
//                 "Tableau de bord personnalisé",
//                 "Support dédié 24/7"
//               ].map((benefit, index) => (
//                 <div key={index} className="flex items-center gap-3">
//                   <div className="bg-[#00a455]/20 p-2 rounded-full">
//                     <Check className="h-4 w-4 text-[#00a455]" />
//                   </div>
//                   <span>{benefit}</span>
//                 </div>
//               ))}
//             </div>

//             <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
//               <div className="flex items-center gap-4">
//                 <div className="bg-[#00a455] p-3 rounded-full">
//                   <Mail className="h-6 w-6 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="font-bold mb-1">Des questions ?</h3>
//                   <p className="text-gray-300 text-sm">
//                     Contactez-nous à <span className="text-[#00a455]">support@umurindi.com</span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }