"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MobileNav } from "@/components/ui/mobile-nav";
import { DollarSign, Building2, Users, LineChart, Search, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header/Navigation */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">

              <Image src="/umurindi.jpeg" alt="Logo" className='rounded-lg' width={32} height={32} />
              <span className="text-[#00a455] font-bold">Umurindi</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="nav-link">Investissements</a>
              <a href="#" className="nav-link">Crédits</a>
              <a href="#" className="nav-link">Nos Membres</a>
              <a href="#" className="nav-link">Qui sommes-nous ?</a>
              <a href="#" className="nav-link">Contact</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button className="p-2">
                <Search className="h-5 w-5 text-gray-500" />
              </button>
              <Link href="/auth/login">
                <Button className="bg-[#00a455] text-white hover:bg-green-500">
                  Connexion
                </Button>
              </Link>
            </div>

            <MobileNav />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#1e2a36] text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full">
          <div className="absolute inset-0 bg-[#00a455] transform -skew-x-12"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                Investissez dans des projets rentables et bénéficiez de rendements attractifs.
              </h1>
              <p className="text-lg mb-6 text-gray-200">
                Rejoignez notre coopérative et faites fructifier votre capital tout en soutenant des projets innovants.
              </p>
              <Button className="bg-[#00a455] text-white hover:bg-[#1b7ab3]">
                En savoir plus
              </Button>
            </div>
            <div className="relative">
              <div className="flex justify-center">
                <DollarSign className="w-32 h-32 text-yellow-400" />
              </div>
              <div className="mt-8 space-y-2">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="h-4 bg-yellow-400 w-3/4 ml-auto"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Section Coopérative d'Investissement */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm text-[#00a455] uppercase mb-2 block">COOPÉRATIVE D'INVESTISSEMENT</span>
              <h2 className="text-3xl font-bold mb-2">Investissez Ensemble.</h2>
              <h2 className="text-3xl font-bold mb-4">Récoltez les Bénéfices.</h2>
              <p className="text-gray-600 mb-6">
                Rejoignez une coopérative qui valorise vos investissements et finance des
                projets porteurs d’avenir. En tant que membre, vous pouvez investir dans des
                initiatives prometteuses, obtenir des crédits avantageux et bénéficier des
                rendements générés par la communauté.
              </p>
              <p className="text-gray-600 mb-6">
                Ensemble, nous construisons une économie solidaire où chaque membre
                profite de la croissance collective. Faites fructifier votre capital tout en
                soutenant le développement durable et l'innovation locale.
              </p>
              <Link href="/auth/register">
                <Button variant="outline" className="border-[#00a455] text-[#00a455] hover:bg-[#00a455] hover:text-white">
                  Devenir membre
                </Button>
              </Link>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80"
                alt="Investissement coopératif"
                className="rounded-lg shadow-lg"
                width={500}
                height={300}
              />
            </div>
          </div>
        </div>
      </section>


      {/* Section Coopérative pour les Entrepreneurs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1560438718-eb61ede255eb?auto=format&fit=crop&q=80"
                alt="Entrepreneur"
                className="rounded-lg shadow-lg"
                width={500}
                height={300}
              />
            </div>
            <div>
              <span className="text-sm text-[#00a455] uppercase mb-2 block">
                FINANCEMENT POUR ENTREPRENEURS
              </span>
              <h2 className="text-3xl font-bold mb-4">Soutenir la croissance de votre entreprise.</h2>
              <p className="text-gray-600 mb-6">
                Notre coopérative vous accompagne dans le développement de votre activité en mettant à votre disposition
                des solutions d'investissement adaptées et des crédits avantageux. Nous croyons en votre potentiel et
                nous vous aidons à concrétiser vos projets d'affaires.
              </p>
              <p className="text-gray-600 mb-6">
                Profitez d’un accompagnement personnalisé et d’un réseau solidaire pour répondre aux défis du marché actuel.
                Ensemble, nous bâtissons un avenir prospère pour les entrepreneurs et la communauté.
              </p>
              <Button variant="outline" className="border-[#00a455] text-[#00a455] hover:bg-[#00a455] hover:text-white">
                En savoir plus
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* Section Témoignages de Réussite */}
      <section className="bg-[#1e2a36] py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Histoires de Réussite</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Du rêve à la réalité grâce à la coopérative",
                image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80"
              },
              {
                title: "Des financements à impact pour les entrepreneurs",
                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
              },
              {
                title: "Une ferme laitière qui prospère grâce à un prêt coopératif",
                image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80"
              }
            ].map((story, index) => (
              <Card key={index} className="bg-white">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold mb-4 text-gray-900">{story.title}</h3>
                  <Button variant="outline" size="sm" className="border-[#00a455] text-[#00a455] hover:bg-[#00a455] hover:text-white">
                    Lire l'histoire
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Section des Statistiques d'Impact */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <span className="text-sm text-[#00a455] uppercase mb-2 block">À PROPOS DE NOUS</span>
              <h2 className="text-3xl font-bold mb-4">
                Vos choix reflètent vos valeurs. Votre coopérative devrait aussi.
              </h2>
              <p className="text-gray-600 mb-6">
                Nous sommes une coopérative dédiée à servir les besoins de nos membres. Grâce à notre modèle coopératif, nous nous concentrons sur le succès de nos membres tout en ayant un impact positif dans nos communautés.
              </p>
              <Button variant="outline" className="border-[#00a455] text-[#00a455] hover:bg-[#00a455] hover:text-white">
                En savoir plus sur nous
              </Button>
            </div>
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#00a455]/10 rounded-full">
                  <DollarSign className="w-8 h-8 text-[#00a455]" />
                </div>
                <div>
                  <div className="font-bold text-2xl">475 Millions $</div>
                  <div className="text-sm text-gray-600">Impact total des prêts dans les communautés</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#00a455]/10 rounded-full">
                  <LineChart className="w-8 h-8 text-[#00a455]" />
                </div>
                <div>
                  <div className="font-bold text-2xl">132 MW</div>
                  <div className="text-sm text-gray-600">d'énergie propre financée</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#00a455]/10 rounded-full">
                  <Building2 className="w-8 h-8 text-[#00a455]" />
                </div>
                <div>
                  <div className="font-bold text-2xl">2.9 Millions $</div>
                  <div className="text-sm text-gray-600">en subventions pour soutenir les organisations locales</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Section Restez Informé */}
      <section className="py-16 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[#1e2a36]/80"></div>
          <div className="relative z-10 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Restez Informé</h2>
            <p className="mb-6">Restez informé sur Umurindi et découvrez comment nous avons un impact sur les communautés.</p>
            <Link href="/auth/register">
              <Button className="bg-[#00a455] text-white hover:bg-green-500">
                Inscrivez-vous
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section Ressources */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Ressources</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Rapport de Mission Umurindi",
                type: "PUBLICATION",
                action: "TÉLÉCHARGER"
              },
              {
                title: "Umurindi Coop 100",
                type: "PUBLICATION",
                action: "TÉLÉCHARGER"
              },
              {
                title: "Qu'est-ce que le Smishing ?",
                type: "ASTUCES DE SÉCURITÉ",
                action: "LIRE L'ARTICLE"
              }
            ].map((resource, index) => (
              <Card key={index} className="p-6">
                <div className="text-sm text-[#00a455] mb-2">{resource.type}</div>
                <h3 className="font-bold mb-4 text-xl">{resource.title}</h3>
                <Button variant="outline" size="sm" className="border-[#00a455] text-[#00a455] hover:bg-[#00a455] hover:text-white">
                  {resource.action}
                </Button>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" className="border-[#00a455] text-[#00a455] hover:bg-[#00a455] hover:text-white">
              Voir plus de ressources
            </Button>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-[#1e2a36] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <p>800.955.9622</p>
              <p>2011 Crystal Drive,</p>
              <p>Suite 800</p>
              <p>Arlington, VA 22202</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Mentions Légales</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#00a455]">Politique de Confidentialité</a></li>
                <li><a href="#" className="hover:text-[#00a455]">Conditions d'Utilisation</a></li>
                <li><a href="#" className="hover:text-[#00a455]">Accessibilité</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Suivez-Nous</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-[#00a455]"><Facebook className="h-6 w-6" /></a>
                <a href="#" className="hover:text-[#00a455]"><Twitter className="h-6 w-6" /></a>
                <a href="#" className="hover:text-[#00a455]"><Linkedin className="h-6 w-6" /></a>
                <a href="#" className="hover:text-[#00a455]"><Instagram className="h-6 w-6" /></a>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Certifications</h3>
              <div className="flex space-x-4">
                <img src="/fdic-logo.svg" alt="FDIC" className="h-12 w-auto" />
                <img src="/security-cert.svg" alt="Certification de Sécurité" className="h-12 w-auto" />
              </div>
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}