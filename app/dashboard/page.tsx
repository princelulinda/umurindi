'use client'

import { StatsCard } from '@/components/dashboard/stats-card'
import { ProjectCard } from '@/components/dashboard/project-card'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { Wallet, TrendingUp, PiggyBank, ArrowUpRight, ArrowDownRight, Users, Plus, Minus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import useAuthStore from '@/stores/authStore'
import ProjectItem from '@/components/ProjectItem'
import { useEffect } from 'react'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DepositForm } from '@/components/forms/deposit-form'
import { WithdrawalForm } from '@/components/forms/withdrawal-form'

export default function Home() {
    const { user, isAuthenticated, isLoading, loadUser } = useAuthStore();

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
                <div className="flex gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="gap-2">
                                <Plus className="h-4 w-4" />
                                Dépôt
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Effectuer un dépôt</DialogTitle>
                            </DialogHeader>
                            <DepositForm />
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="gap-2">
                                <Minus className="h-4 w-4" />
                                Retrait
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Demander un retrait</DialogTitle>
                            </DialogHeader>
                            <WithdrawalForm />
                        </DialogContent>
                    </Dialog>

                    <Link href={'/dashboard/creditRequest'}>
                        <Button className="hidden sm:flex gap-2">
                            <Users className="h-4 w-4" />
                            Crédit
                        </Button>
                    </Link>
                </div>
            </div>
 
            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Solde Total"
                    value={user?.solde}
                    description="Mise à jour il y a 2 minutes"
                    icon={Wallet}
                />
                <StatsCard
                    title="Total Investi"
                    value="0.00"
                    icon={PiggyBank}
                    trend={{ value: '+12.5%', positive: true }}
                />
                <StatsCard
                    title="Rendement Total"
                    value="0.000 BIF"
                    icon={TrendingUp}
                    trend={{ value: '+5.2%', positive: true }}
                />
                <StatsCard
                    title="Projets Actifs"
                    value="0"
                    description="0 en cours"
                    icon={TrendingUp}
                />
            </div>

            {/* Quick Actions */}
            {/* <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Actions rapides</CardTitle>
                        <CardDescription>Opérations fréquentes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-2">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="gap-2 h-20 flex-col">
                                        <Plus className="h-5 w-5" />
                                        <span>Dépôt</span>
                                    </Button>
                                </DialogTrigger>
                            </Dialog>
                            
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="gap-2 h-20 flex-col">
                                        <Minus className="h-5 w-5" />
                                        <span>Retrait</span>
                                    </Button>
                                </DialogTrigger>
                            </Dialog>
                            
                            <Link href="/dashboard/investments" className="col-span-2">
                                <Button className="w-full gap-2 h-20 flex-col">
                                    <TrendingUp className="h-5 w-5" />
                                    <span>Mes investissements</span>
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Dernières transactions</CardTitle>
                        <CardDescription>Vos opérations récentes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
                                        <ArrowDownRight className="h-4 w-4 text-green-600 dark:text-green-300" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Dépôt</p>
                                        <p className="text-sm text-muted-foreground">Aujourd'hui, 10:45</p>
                                    </div>
                                </div>
                                <p className="font-medium text-green-600">+50,000 BIF</p>
                            </div>
                            
                            <div className="flex items-center justify-between p-2 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-red-100 dark:bg-red-900">
                                        <ArrowUpRight className="h-4 w-4 text-red-600 dark:text-red-300" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Investissement</p>
                                        <p className="text-sm text-muted-foreground">Hier, 14:30</p>
                                    </div>
                                </div>
                                <p className="font-medium text-red-600">-25,000 BIF</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div> */}

            {/* Main Content */}
            <div className="grid gap-6">
                <div className="col-span-4 space-y-6">
                    {/* Project Proposals */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Projets Recommandés</h2>
                            <Button variant="outline" size="sm">Voir tout</Button>
                        </div>
                        <ProjectItem display={2} />
                    </div>
                </div>
            </div>  
        </div>
    )
}