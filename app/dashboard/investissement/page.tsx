"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Search, Plus, FileSearch, AlertCircle, ArrowRight } from 'lucide-react'
import useFeaturesStore from '@/stores/features'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export default function InvestissementPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const { loadInvestissements, investissements } = useFeaturesStore()

  useEffect(() => {
    loadInvestissements()
  }, [loadInvestissements])

  // Formater les données des investissements
  const formattedInvestments = investissements?.map(investment => ({
    id: investment.id,
    name: investment.projet_title,
    type: 'project',
    progress: Math.round((investment.total_investi_projet / (investment.total_investi_projet + Number(investment.montant))) * 100),
    montant: Number(investment.montant),
    returnRate: investment.interet_estime,
    startDate: format(new Date(investment.create_date), 'dd MMM yyyy', { locale: fr }),
    nextPayment: format(new Date(investment.create_date), 'dd MMM yyyy', { locale: fr }),
    parts: investment.part,
    motif: investment.motif,
    slug: investment.slug
  })) || []

  const filteredInvestments = formattedInvestments.filter(investment => {
    const matchesSearch = investment.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === 'all' || investment.type === activeTab
    return matchesSearch && matchesTab
  })

  const totalInvested = formattedInvestments.reduce((sum, inv) => sum + inv.montant, 0)
  const totalReturns = formattedInvestments.reduce((sum, inv) => sum + (inv.montant * inv.returnRate / 100), 0)
  const averageProgress = formattedInvestments.length > 0 
    ? formattedInvestments.reduce((sum, inv) => sum + inv.progress, 0) / formattedInvestments.length
    : 0

  return (
    <div className="flex-1 h-full bg-background">
      <div className="h-full p-8 pt-6 space-y-8 overflow-auto">
        {/* En-tête */}
        <div className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Mes Investissements</h1>
              <p className="text-muted-foreground mt-2">
                Suivez la progression de vos investissements
              </p>
            </div>
            <Button className="hidden sm:flex" variant="outline">
              Exporter les données
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{formattedInvestments.length}</div>
              <p className="text-sm text-muted-foreground">Investissements actifs</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">
                {new Intl.NumberFormat('fr-FR').format(totalInvested)} BIF
              </div>
              <p className="text-sm text-muted-foreground">Total investi</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">
                {new Intl.NumberFormat('fr-FR').format(totalReturns)} BIF
              </div>
              <p className="text-sm text-muted-foreground">Retours estimés</p>
            </CardContent>
          </Card>
        </div>

        {/* Filtres */}
        <div className="flex flex-col gap-4 sm:flex-row items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher un investissement..."
              className="pl-9 bg-transparent border-gray-200 dark:border-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="project">Projets</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Liste des investissements */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredInvestments.map((investment) => (
            <Card key={investment.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{investment.name}</h3>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      Projet
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progression</span>
                      <span className="font-medium">{investment.progress}%</span>
                    </div>
                    <Progress 
                      value={investment.progress} 
                      className="h-2 transition-all duration-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Montant investi</p>
                      <p className="font-medium text-primary">
                        {new Intl.NumberFormat('fr-FR').format(investment.montant)} BIF
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Parts acquises</p>
                      <p className="font-medium">{investment.parts}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Date d'investissement</p>
                      <p className="font-medium">{investment.startDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Retour estimé</p>
                      <p className="font-medium">{investment.returnRate}%</p>
                    </div>
                  </div>

                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground mb-1">Motif:</p>
                    <p className="text-sm line-clamp-2">{investment.motif}</p>
                  </div>

                  <Button 
                    variant="default" 
                    className="w-full mt-2 hover:scale-[1.02] transition-transform" 
                    asChild
                  >
                    <Link href={`/projets/${investment.slug}`}>
                      Voir le projet <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredInvestments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-dashed border-gray-200 dark:border-gray-700">
            {searchQuery || activeTab !== 'all' ? (
              <>
                <FileSearch className="h-16 w-16 text-muted-foreground mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Aucun résultat trouvé
                </h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  Aucun investissement ne correspond à vos critères de recherche. Essayez d'ajuster vos filtres.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setSearchQuery('')}>
                    Réinitialiser la recherche
                  </Button>
                  <Button onClick={() => setActiveTab('all')}>
                    Voir tous les investissements
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <Plus className="h-10 w-10 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="absolute -right-2 -top-2 bg-secondary rounded-full p-2 border-4 border-white dark:border-gray-800">
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                  </div>
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Aucun investissement enregistré
                </h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  Commencez à investir dans des projets pour les voir apparaître ici.
                </p>
                <Button className="gap-2" asChild>
                  <Link href="/projets">
                    <Plus className="h-4 w-4" />
                    Explorer les projets
                  </Link>
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}