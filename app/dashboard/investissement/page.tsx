'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Search } from 'lucide-react'

// Données de test pour les investissements
const investments = [
  {
    id: 1,
    type: 'project',
    name: 'Ferme Agricole Moderne',
    amount: 500000,
    totalAmount: 5000000,
    progress: 65,
    returnRate: 15,
    status: 'En cours',
    startDate: '2025-01-15',
    nextPayment: '2025-04-15',
    totalReturns: 25000,
  },
  {
    id: 2,
    type: 'credit',
    name: 'Crédit Agriculture',
    amount: 300000,
    totalAmount: 3000000,
    progress: 40,
    returnRate: 12,
    status: 'En cours',
    startDate: '2025-02-01',
    nextPayment: '2025-04-01',
    totalReturns: 15000,
  },
  {
    id: 3,
    type: 'project',
    name: 'Commerce de Produits Locaux',
    amount: 250000,
    totalAmount: 2500000,
    progress: 85,
    returnRate: 10,
    status: 'En cours',
    startDate: '2024-11-20',
    nextPayment: '2025-04-20',
    totalReturns: 45000,
  }
]

export default function InvestissementPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  const filteredInvestments = investments.filter(investment => {
    const matchesSearch = investment.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === 'all' || investment.type === activeTab
    return matchesSearch && matchesTab
  })

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0)
  const totalReturns = investments.reduce((sum, inv) => sum + inv.totalReturns, 0)
  const averageProgress = investments.reduce((sum, inv) => sum + inv.progress, 0) / investments.length

  return (
    <div className="flex-1 h-full bg-background">
      <div className="h-full p-8 pt-6 space-y-8 overflow-auto">
        {/* En-tête avec fond et ombre */}
        <div className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Mes Investissements</h1>
              <p className="text-muted-foreground mt-2">
                Suivez la progression de vos investissements et crédits
              </p>
            </div>
            <Button className="hidden sm:flex" variant="outline">
              Exporter les données
            </Button>
          </div>
        </div>

        {/* Stats rapides avec animation au survol */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{investments.length}</div>
              <p className="text-sm text-muted-foreground">Investissements actifs</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{totalInvested.toLocaleString()} BIF</div>
              <p className="text-sm text-muted-foreground">Total investi</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{totalReturns.toLocaleString()} BIF</div>
              <p className="text-sm text-muted-foreground">Retours totaux</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{averageProgress.toFixed(1)}%</div>
              <p className="text-sm text-muted-foreground">Progression moyenne</p>
            </CardContent>
          </Card>
        </div>

        {/* Filtres avec style amélioré */}
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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="project">Projets</TabsTrigger>
              <TabsTrigger value="credit">Crédits</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Liste des investissements avec animation */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredInvestments.map((investment) => (
            <Card key={investment.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{investment.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      investment.type === 'project' 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                        : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    }`}>
                      {investment.type === 'project' ? 'Projet' : 'Crédit'}
                    </span>
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
                      <p className="font-medium text-primary">{investment.amount.toLocaleString()} BIF</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Retour attendu</p>
                      <p className="font-medium text-primary">{investment.returnRate}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Date de début</p>
                      <p className="font-medium">{investment.startDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Prochain paiement</p>
                      <p className="font-medium">{investment.nextPayment}</p>
                    </div>
                  </div>

                  <Button 
                    variant="default" 
                    className="w-full mt-2 hover:scale-[1.02] transition-transform"
                    onClick={() => window.location.href = `/investissement/${investment.id}`}
                  >
                    Voir les détails
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredInvestments.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <p className="text-muted-foreground">
              Aucun investissement ne correspond à vos critères de recherche.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}