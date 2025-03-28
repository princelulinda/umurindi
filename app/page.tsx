"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MobileNav } from "@/components/ui/mobile-nav";
import { DollarSign, Building2, Users, LineChart, Search, Facebook, Twitter, Linkedin, Instagram, ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header/Navigation - Version améliorée */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
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
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#" className="text-gray-700 hover:text-[#00a455] font-medium transition-colors duration-200">Investissements</Link>
              <Link href="#" className="text-gray-700 hover:text-[#00a455] font-medium transition-colors duration-200">Crédits</Link>
              <Link href="#" className="text-gray-700 hover:text-[#00a455] font-medium transition-colors duration-200">Nos Membres</Link>
              <Link href="#" className="text-gray-700 hover:text-[#00a455] font-medium transition-colors duration-200">À propos</Link>
              <Link href="#" className="text-gray-700 hover:text-[#00a455] font-medium transition-colors duration-200">Contact</Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Search className="h-5 w-5 text-gray-500" />
              </button>
              <Link href="/auth/login">
                <Button className="bg-gradient-to-r from-[#00a455] to-[#1b7ab3] text-white hover:opacity-90 transition-opacity shadow-md">
                  Connexion
                </Button>
              </Link>
            </div>

            <MobileNav />
          </nav>
        </div>
      </header>

      {/* Hero Section - Version améliorée */}
      <section className="bg-gradient-to-r from-[#1e2a36] to-[#2c3e50] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Investissez dans des projets <span className="text-[#00a455]">rentables</span> et bénéficiez de rendements attractifs.
              </h1>
              <p className="text-xl text-gray-300 max-w-lg">
                Rejoignez notre coopérative et faites fructifier votre capital tout en soutenant des projets innovants et durables.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="bg-[#00a455] hover:bg-[#008a48] text-white px-8 py-6 text-lg font-medium shadow-lg transition-all hover:shadow-xl">
                  Commencer maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-medium">
                  En savoir plus
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
                <div className="flex justify-center mb-6">
                  <div className="bg-[#00a455]/20 p-6 rounded-full">
                    <DollarSign className="w-12 h-12 text-[#00a455]" />
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    "Rendements moyens de 7-12% par an",
                    "Investissement minimum à partir de 500€",
                    "Suivi transparent de vos projets"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-[#00a455]" />
                      <span className="text-lg">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Coopérative d'Investissement - Version améliorée */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-block px-4 py-2 bg-[#00a455]/10 text-[#00a455] rounded-full text-sm font-semibold">
                COOPÉRATIVE D'INVESTISSEMENT
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                <span className="text-[#00a455]">Investissez</span> Ensemble. <br />
                <span className="text-[#1b7ab3]">Récoltez</span> les Bénéfices.
              </h2>
              <p className="text-lg text-gray-600">
                Rejoignez une coopérative qui valorise vos investissements et finance des projets porteurs d'avenir. 
                En tant que membre, vous pouvez investir dans des initiatives prometteuses, obtenir des crédits 
                avantageux et bénéficier des rendements générés par la communauté.
              </p>
              <div className="pt-4">
                <Link href="/auth/register">
                  <Button className="bg-gradient-to-r from-[#00a455] to-[#1b7ab3] text-white hover:opacity-90 px-8 py-6 text-lg font-medium shadow-lg">
                    Devenir membre
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
                  alt="Investissement coopératif"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-xl font-bold text-white">Notre communauté compte déjà 1 250+ membres</h3>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#00a455] rounded-full opacity-20 z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Coopérative pour les Entrepreneurs - Version améliorée */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative order-1 md:order-none">
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1560438718-eb61ede255eb?auto=format&fit=crop&w=800&q=80"
                  alt="Entrepreneur"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#1b7ab3] rounded-full opacity-20 z-0"></div>
            </div>
            <div className="space-y-6">
              <span className="inline-block px-4 py-2 bg-[#1b7ab3]/10 text-[#1b7ab3] rounded-full text-sm font-semibold">
                FINANCEMENT POUR ENTREPRENEURS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Soutenez la croissance de votre <span className="text-[#1b7ab3]">entreprise</span>
              </h2>
              <p className="text-lg text-gray-600">
                Notre coopérative vous accompagne dans le développement de votre activité avec des solutions 
                d'investissement adaptées et des crédits avantageux. Nous croyons en votre potentiel et 
                vous aidons à concrétiser vos projets.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  "Taux d'intérêt compétitifs",
                  "Processus de demande simplifié",
                  "Accompagnement personnalisé",
                  "Remboursements flexibles"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#1b7ab3] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Button variant="outline" className="border-[#1b7ab3] text-[#1b7ab3] hover:bg-[#1b7ab3] hover:text-white px-8 py-6 text-lg font-medium">
                  Explorer les options de financement
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Témoignages de Réussite - Version améliorée */}
      <section className="py-20 bg-[#1e2a36] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-semibold mb-4">
              TÉMOIGNAGES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Histoires de <span className="text-[#00a455]">Réussite</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Découvrez comment nos membres et partenaires transforment leurs ambitions en réalité.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Du rêve à la réalité grâce à la coopérative",
                excerpt: "J'ai pu lancer mon entreprise grâce au financement participatif.",
                image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=600&q=80",
                name: "Sophie M.",
                role: "Entrepreneure"
              },
              {
                title: "Des financements à impact pour les entrepreneurs",
                excerpt: "Un accompagnement précieux pour développer mon activité.",
                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
                name: "Thomas L.",
                role: "Artisan"
              },
              {
                title: "Une ferme laitière qui prospère",
                excerpt: "Le prêt coopératif m'a permis de moderniser mon exploitation.",
                image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80",
                name: "Jean D.",
                role: "Agriculteur"
              }
            ].map((story, index) => (
              <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden group">
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                  <p className="text-gray-300 mb-4">{story.excerpt}</p>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-10 h-10 rounded-full bg-[#00a455] flex items-center justify-center text-white font-bold">
                      {story.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{story.name}</div>
                      <div className="text-sm text-gray-400">{story.role}</div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#1e2a36] px-8 py-6 text-lg">
              Voir plus de témoignages
            </Button>
          </div>
        </div>
      </section>

      {/* Section des Statistiques d'Impact - Version améliorée */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-block px-4 py-2 bg-[#00a455]/10 text-[#00a455] rounded-full text-sm font-semibold">
                NOTRE IMPACT
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Vos choix reflètent vos valeurs. <br />
                Votre coopérative aussi.
              </h2>
              <p className="text-lg text-gray-600">
                Nous sommes une coopérative dédiée à servir les besoins de nos membres. Grâce à notre modèle coopératif, 
                nous nous concentrons sur le succès de nos membres tout en ayant un impact positif dans nos communautés.
              </p>
              <div className="pt-4">
                <Button variant="outline" className="border-[#00a455] text-[#00a455] hover:bg-[#00a455] hover:text-white px-8 py-6 text-lg font-medium">
                  En savoir plus sur nous
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#00a455]/10 rounded-full">
                    <DollarSign className="w-8 h-8 text-[#00a455]" />
                  </div>
                  <div>
                    <div className="font-bold text-3xl text-[#00a455]">475M €</div>
                    <div className="text-gray-600">Impact total des prêts</div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#1b7ab3]/10 rounded-full">
                    <LineChart className="w-8 h-8 text-[#1b7ab3]" />
                  </div>
                  <div>
                    <div className="font-bold text-3xl text-[#1b7ab3]">132 MW</div>
                    <div className="text-gray-600">d'énergie propre financée</div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#00a455]/10 rounded-full">
                    <Building2 className="w-8 h-8 text-[#00a455]" />
                  </div>
                  <div>
                    <div className="font-bold text-3xl text-[#00a455]">2.9M €</div>
                    <div className="text-gray-600">en subventions locales</div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#1b7ab3]/10 rounded-full">
                    <Users className="w-8 h-8 text-[#1b7ab3]" />
                  </div>
                  <div>
                    <div className="font-bold text-3xl text-[#1b7ab3]">1 250+</div>
                    <div className="text-gray-600">membres actifs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA - Version améliorée */}
      <section className="relative py-20 bg-gradient-to-r from-[#00a455] to-[#1b7ab3] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')]"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à rejoindre notre communauté ?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Inscrivez-vous dès maintenant et bénéficiez de tous les avantages de notre coopérative.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button className="bg-white text-[#00a455] hover:bg-gray-100 px-8 py-6 text-lg font-medium shadow-lg">
                S'inscrire gratuitement
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-medium">
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - Version améliorée */}
      <footer className="bg-[#1e2a36] text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Image 
                  src="/umurindi.jpeg" 
                  alt="Logo Umurindi" 
                  className='rounded-lg object-cover' 
                  width={40} 
                  height={40} 
                />
                <span className="text-xl font-extrabold bg-gradient-to-r from-[#00a455] to-[#1b7ab3] bg-clip-text text-transparent">
                  Umurindi
                </span>
              </div>
              <p className="text-gray-400 mb-6">
                Une coopérative financière au service de ses membres et de la communauté.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-[#00a455] transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-[#00a455] transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-[#00a455] transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-[#00a455] transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-6">Navigation</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-gray-400 hover:text-[#00a455] transition-colors">Accueil</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-[#00a455] transition-colors">Investissements</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-[#00a455] transition-colors">Crédits</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-[#00a455] transition-colors">À propos</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-[#00a455] transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-6">Légal</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-gray-400 hover:text-[#00a455] transition-colors">Conditions générales</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-[#00a455] transition-colors">Politique de confidentialité</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-[#00a455] transition-colors">Mentions légales</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-[#00a455] transition-colors">Cookies</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-6">Contact</h3>
              <address className="not-italic text-gray-400 space-y-3">
                <p>123 Rue de la Coopération</p>
                <p>75000 Paris, France</p>
                <p>contact@umurindi.com</p>
                <p>+33 1 23 45 67 89</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Umurindi. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-6">
              <Image 
                src="/fdic-logo.svg" 
                alt="FDIC" 
                width={80} 
                height={40} 
                className="h-8 w-auto" 
              />
              <Image 
                src="/security-cert.svg" 
                alt="Certification de Sécurité" 
                width={80} 
                height={40} 
                className="h-8 w-auto" 
              />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}