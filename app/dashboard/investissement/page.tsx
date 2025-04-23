"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Search, Plus, FileSearch, AlertCircle } from 'lucide-react'
import useFeaturesStore from '@/stores/features'

export default function InvestissementPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [investments, setInvestments] = useState([])
  const { loadInvestissements, investissements } = useFeaturesStore()

  useEffect(() => {
    loadInvestissements()
    setInvestments(investissements) 
  }, [])

  const filteredInvestments = investments?.filter(investment => {
    const matchesSearch = investment.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === 'all' || investment.type === activeTab
    return matchesSearch && matchesTab
  })

  const totalInvested = investments?.reduce((sum, inv) => sum + inv.amount, 0)
  const totalReturns = investments?.reduce((sum, inv) => sum + inv.totalReturns, 0)
  const averageProgress = investments?.reduce((sum, inv) => sum + inv.progress, 0) / investments?.length

  return (
    <div className="flex-1 h-full bg-background">
      <div className="h-full p-8 pt-6 space-y-8 overflow-auto">
        {/* En-tête */}
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

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{investments?.length}</div>
              <p className="text-sm text-muted-foreground">Investissements actifs</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{totalInvested?.toLocaleString()} BIF</div>
              <p className="text-sm text-muted-foreground">Total investi</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{totalReturns?.toLocaleString()} BIF</div>
              <p className="text-sm text-muted-foreground">Retours totaux</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{averageProgress?.toFixed(1)}%</div>
              <p className="text-sm text-muted-foreground">Progression moyenne</p>
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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="project">Projets</TabsTrigger>
              <TabsTrigger value="credit">Crédits</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Liste des investissements */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredInvestments?.map((investment) => (
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
                    onClick={() => window.location.href = `/dashboard/investissement/${investment.id}`}
                  >
                    Voir les détails
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State amélioré */}
        {filteredInvestments?.length === 0 && (
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
                  Commencez à suivre vos investissements en ajoutant votre premier projet ou crédit.
                </p>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Ajouter un investissement
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}