'use client'

import { useEffect, useState } from 'react'
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
import { Search, ArrowRight, Loader2 } from 'lucide-react'
import useFeaturesStore from '@/stores/features'

const categories = ['Tous', 'Agriculture', 'Commerce', 'Personnel', 'Investissement']
const durations = ['Tous', '6 mois', '12 mois', '24 mois', '60 mois']

export default function CreditPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [selectedDuration, setSelectedDuration] = useState('Tous')
  const [isMounted, setIsMounted] = useState(false)
  const { credit, isLoading, loadCredit } = useFeaturesStore()
  
  useEffect(() => {
    loadCredit()
    setIsMounted(true)
  }, [])
  
  const filteredCredits = credit
  if (!isMounted) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="space-y-6 p-4 sm:space-y-8 sm:p-6 lg:p-8 flex-1 overflow-auto">
        {/* En-tête */}
        <div className="flex flex-col gap-2 sm:gap-4 max-w-4xl">
          <h1 className="text-2xl font-bold sm:text-3xl">Crédit et Financement</h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Découvrez nos solutions de financement adaptées à vos besoins
          </p>
        </div>
    
        {/* Filtres */}
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher un crédit..."
              className="pl-9 text-sm sm:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full text-xs sm:text-sm sm:w-[160px] lg:w-[180px]">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category} className="text-xs sm:text-sm">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedDuration} onValueChange={setSelectedDuration}>
              <SelectTrigger className="w-full text-xs sm:text-sm sm:w-[160px] lg:w-[180px]">
                <SelectValue placeholder="Durée" />
              </SelectTrigger>
              <SelectContent>
                {durations.map(duration => (
                  <SelectItem key={duration} value={duration} className="text-xs sm:text-sm">
                    {duration}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
    
        {/* Liste des crédits */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
              {filteredCredits?.map((credit) => (
                <CreditCard key={credit?.id} {...credit} />
              ))}
            </div>
          
            {filteredCredits?.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <p className="text-muted-foreground text-sm sm:text-base">
                  Aucun crédit ne correspond à vos critères de recherche.
                </p>
                <Button 
                  variant="ghost" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('Tous')
                    setSelectedDuration('Tous')
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </>
        )}
    
        {/* Section d'aide */}
        <Card className="mt-6 sm:mt-8">
          <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h3 className="font-semibold text-sm sm:text-base">Besoin d'aide pour choisir ?</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Nos conseillers sont là pour vous guider dans votre choix de financement
              </p>
            </div>
            <Button className="gap-2 text-xs sm:text-sm">
              Prendre rendez-vous
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}