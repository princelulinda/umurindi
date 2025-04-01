'use client'
import { StatsCard } from '@/components/dashboard/stats-card'
import { ProjectCard } from '@/components/dashboard/project-card'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { Wallet, TrendingUp, PiggyBank, ArrowUpRight, ArrowDownRight, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import useAuthStore from '@/stores/authStore'
import ProjectItem from '@/components/ProjectItem'
import { useEffect } from 'react'

const recentTransactions = [
    {
        id: 1,
        description: 'Investissement - Projet Agriculture',
        amount: '-500.000 BIF',
        date: '22 Mars 2025',
        type: 'debit',
    },
    {
        id: 2,
        description: 'Dépôt via Mobile Money',
        amount: '+1.000.000 BIF',
        date: '20 Mars 2025',
        type: 'credit',
    },
    {
        id: 3,
        description: 'Retrait - Banque',
        amount: '-200.000 BIF',
        date: '18 Mars 2025',
        type: 'debit',
    },
]

export default function Home() {
    const { user, isAuthenticated, isLoading, loadUser} = useAuthStore();

    useEffect(() => {
        loadUser();    
    }, [loadUser]);

    return (
        <div className="w-full mx-auto space-y-8 pt-16">
          {/* Welcome Section */}
          <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Bonjour, {user?.first_name} 👋</h1>
                    <p className="text-muted-foreground">Voici un aperçu de vos investissements</p>
                </div>
                <Button className="hidden sm:flex gap-2">
                    <Users className="h-4 w-4" />
                    investi dans les credits
                </Button>
            </div>
 
            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Solde Total"
                    value="2.500.000 BIF"
                    description="Mise à jour il y a 2 minutes"
                    icon={Wallet}
                />
                <StatsCard
                    title="Total Investi"
                    value="1.800.000 BIF"
                    icon={PiggyBank}
                    trend={{ value: '+12.5%', positive: true }}
                />
                <StatsCard
                    title="Rendement Total"
                    value="320.000 BIF"
                    icon={TrendingUp}
                    trend={{ value: '+5.2%', positive: true }}
                />
                <StatsCard
                    title="Projets Actifs"
                    value="3"
                    description="2 en cours"
                    icon={TrendingUp}
                />
            </div>

            {/* Main Content */}
            <div className="grid gap-6 md:grid-cols-6">
                <div className="col-span-4 space-y-6">
                    {/* Financial Overview */}
                    {/* <OverviewChart /> */}

                    {/* Performance Metrics */}
                    {/* <PerformanceMetrics /> */}

                    {/* Project Proposals */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Projets Recommandés</h2>
                            <Button variant="outline" size="sm">Voir tout</Button>
                        </div>
                        <ProjectItem display={2} />
                    </div>
                </div>

                <div className="col-span-4 md:col-span-2 space-y-6">
                    {/* Quick Actions */}
                    <QuickActions />

                    {/* Recent Transactions */}
                    <Card className="overflow-hidden">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-lg font-semibold">Transactions Récentes</CardTitle>
                            <CardDescription>Vos dernières opérations financières</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {recentTransactions.map((transaction) => (
                                    <div
                                        key={transaction.id}
                                        className="flex items-center justify-between py-3 border-t border-border/50"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-full ${transaction.type === 'credit' ? 'bg-green-50' : 'bg-red-50'}`}>
                                                {transaction.type === 'credit' ? (
                                                    <ArrowUpRight className={`h-4 w-4 ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`} />
                                                ) : (
                                                    <ArrowDownRight className={`h-4 w-4 ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`} />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{transaction.description}</p>
                                                <p className="text-xs text-muted-foreground">{transaction.date}</p>
                                            </div>
                                        </div>
                                        <span
                                            className={`text-sm font-medium ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}
                                        >
                                            {transaction.amount}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" className="w-full mt-4" size="sm">
                                Voir toutes les transactions
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Investment Summary */}
                    {/* <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-lg font-semibold">Répartition des Investissements</CardTitle>
              <CardDescription>Par secteur d&apos;activité</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { sector: 'Agriculture', amount: '1.000.000 BIF', percentage: 55 },
                  { sector: 'Élevage', amount: '500.000 BIF', percentage: 28 },
                  { sector: 'Commerce', amount: '300.000 BIF', percentage: 17 },
                ].map((item) => (
                  <div key={item.sector} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.sector}</span>
                      <span className="text-primary">{item.amount}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary/60 rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}
                </div>
            </div>  
        </div>
    )
}
