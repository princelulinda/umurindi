'use client'

import { ArrowLeft, Calendar, DollarSign, LineChart, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Données de test pour un investissement spécifique
const investment = {
  id: 1,
  type: 'project',
  name: 'Ferme Agricole Moderne',
  amount: 500000,
  totalAmount: 5000000,
  progress: 65,
  returnRate: 15,
  status: 'En cours',
  startDate: '2025-01-15',
  endDate: '2026-01-15',
  nextPayment: '2025-04-15',
  totalReturns: 25000,
  description: 'Projet d\'agriculture moderne utilisant des techniques innovantes pour augmenter la production',
  paymentHistory: [
    { date: '2025-01-15', amount: 10000, type: 'Investissement initial' },
    { date: '2025-02-15', amount: 7500, type: 'Retour mensuel' },
    { date: '2025-03-15', amount: 7500, type: 'Retour mensuel' },
  ],
  documents: [
    { name: 'Contrat d\'investissement', type: 'PDF', date: '2025-01-15' },
    { name: 'Rapport mensuel - Février', type: 'PDF', date: '2025-02-15' },
    { name: 'Rapport mensuel - Mars', type: 'PDF', date: '2025-03-15' },
  ],
  team: [
    { name: 'Jean Dupont', role: 'Chef de projet' },
    { name: 'Marie Martin', role: 'Responsable financier' },
    { name: 'Pierre Durant', role: 'Responsable technique' },
  ]
}

export default function InvestmentDetails() {
  return (
    <div className="flex-1 h-full bg-background">
      <div className="h-full p-8 pt-6 space-y-8 overflow-auto  lg:w-[130vh]">
        {/* En-tête avec fond et ombre */}
        <div className="flex flex-col gap-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => window.history.back()} className="gap-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
            <Button variant="outline" className="hidden sm:flex">
              Télécharger le rapport
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{investment.name}</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                investment.type === 'project' 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                  : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
              }`}>
                {investment.type === 'project' ? 'Projet' : 'Crédit'}
              </span>
            </div>
            <p className="text-muted-foreground">{investment.description}</p>
          </div>
        </div>

        {/* Stats rapides avec animation au survol */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <DollarSign className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold text-primary">{investment.amount.toLocaleString()} BIF</div>
                  <p className="text-sm text-muted-foreground">Montant investi</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <LineChart className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold text-primary">{investment.returnRate}%</div>
                  <p className="text-sm text-muted-foreground">Taux de retour</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Calendar className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold text-primary">{investment.nextPayment}</div>
                  <p className="text-sm text-muted-foreground">Prochain paiement</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold text-primary">{investment.team.length}</div>
                  <p className="text-sm text-muted-foreground">Membres de l'équipe</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progression avec style amélioré */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Progression de l&apos;investissement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progression globale</span>
                <span className="font-medium">{investment.progress}%</span>
              </div>
              <Progress value={investment.progress} className="h-3 transition-all duration-500" />
              <div className="flex justify-between text-sm pt-2">
                <div>
                  <p className="text-muted-foreground">Montant investi</p>
                  <p className="font-medium text-primary">{investment.amount.toLocaleString()} BIF</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground">Montant total</p>
                  <p className="font-medium text-primary">{investment.totalAmount.toLocaleString()} BIF</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Onglets d'information avec style amélioré */}
        <Tabs defaultValue="history" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="history">Historique</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="team">Équipe</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {investment.paymentHistory.map((payment, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg px-3">
                      <div>
                        <p className="font-medium">{payment.type}</p>
                        <p className="text-sm text-muted-foreground">{payment.date}</p>
                      </div>
                      <div className="font-medium text-primary">{payment.amount.toLocaleString()} BIF</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {investment.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg px-3">
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">{doc.date}</p>
                      </div>
                      <Button variant="outline" size="sm" className="hover:scale-[1.02] transition-transform">
                        Télécharger
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {investment.team.map((member, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg px-3">
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
