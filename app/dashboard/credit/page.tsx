'use client'

import { useState } from 'react'
import { CreditCard } from '@/components/credit/credit-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, ArrowRight } from 'lucide-react'

// Données de test pour les crédits
const credits = [
  {
    id: 1,
    title: 'Crédit Agricole',
    description: 'Financement pour les projets agricoles et d\'élevage',
    amount: '10.000.000 BIF',
    duration: '24 mois',
    interestRate: '8%',
    requirements: [
      'Être agriculteur ou éleveur',
      'Avoir un projet viable',
      'Garanties requises',
      'Expérience minimum de 2 ans'
    ],
    status: 'Disponible' as const,
    category: 'Agriculture'
  },
  {
    id: 2,
    title: 'Crédit Commercial',
    description: 'Pour les commerçants et petites entreprises',
    amount: '5.000.000 BIF',
    duration: '12 mois',
    interestRate: '10%',
    requirements: [
      'Avoir une entreprise enregistrée',
      'Chiffre d\'affaires minimum',
      'Pas d\'endettement existant'
    ],
    status: 'Disponible' as const,
    category: 'Commerce'
  },
  {
    id: 3,
    title: 'Crédit Express',
    description: 'Prêt rapide pour les besoins urgents',
    amount: '1.000.000 BIF',
    duration: '6 mois',
    interestRate: '12%',
    requirements: [
      'Salaire régulier',
      'Emploi stable depuis 1 an',
      'Domiciliation bancaire'
    ],
    status: 'Limité' as const,
    category: 'Personnel'
  },
  {
    id: 4,
    title: 'Crédit Investissement',
    description: 'Pour les projets d\'investissement à long terme',
    amount: '25.000.000 BIF',
    duration: '60 mois',
    interestRate: '7%',
    requirements: [
      'Plan d\'affaires détaillé',
      'Apport personnel de 20%',
      'Garanties immobilières',
      'États financiers sur 3 ans'
    ],
    status: 'Bientôt' as const,
    category: 'Investissement'
  }
]

const categories = ['Tous', 'Agriculture', 'Commerce', 'Personnel', 'Investissement']
const durations = ['Tous', '6 mois', '12 mois', '24 mois', '60 mois']

export default function CreditPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [selectedDuration, setSelectedDuration] = useState('Tous')

  const filteredCredits = credits.filter(credit => {
    const matchesSearch = credit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         credit.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === 'Tous' || credit.category === selectedCategory
    const matchesDuration = selectedDuration === 'Tous' || credit.duration === selectedDuration

    return matchesSearch && matchesCategory && matchesDuration
  })

  return (
    <div className="flex flex-col h-full">
    <div className="space-y-8 p-8 flex-1 overflow-auto">
      {/* En-tête */}
      <div className="flex flex-col gap-4 lg:w-[130vh]">
        <h1 className="text-3xl font-bold">Crédit et Financement</h1>
        <p className="text-muted-foreground">
          Découvrez nos solutions de financement adaptées à vos besoins
        </p>
      </div>
  
      {/* Stats rapides */}
      <div className="w-full grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Taux d&apos;intérêt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">À partir de 7%</div>
            <p className="text-xs text-muted-foreground">Selon votre profil</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Montant maximum</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25M BIF</div>
            <p className="text-xs text-muted-foreground">Pour les grands projets</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Délai de réponse</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48h</div>
            <p className="text-xs text-muted-foreground">Pour une première réponse</p>
          </CardContent>
        </Card>
      </div>
  
      {/* Filtres */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher un crédit..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedDuration} onValueChange={setSelectedDuration}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Durée" />
          </SelectTrigger>
          <SelectContent>
            {durations.map(duration => (
              <SelectItem key={duration} value={duration}>
                {duration}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
  
      {/* Liste des crédits */}
      <div className=" w-full grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCredits.map((credit) => (
          <CreditCard key={credit.id} {...credit} />
        ))}
      </div>
  
      {filteredCredits.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Aucun crédit ne correspond à vos critères de recherche.
          </p>
        </div>
      )}
  
      {/* Section d&apos;aide */}
      <Card className="mt-8">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <h3 className="font-semibold">Besoin d&apos;aide pour choisir ?</h3>
            <p className="text-sm text-muted-foreground">
              Nos conseillers sont là pour vous guider dans votre choix de financement
            </p>
          </div>
          <Button className="gap-2">
            Prendre rendez-vous
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
  )
}
