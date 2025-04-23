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
import Link from 'next/link'

export default function Home() {
    const { user, isAuthenticated, isLoading, loadUser} = useAuthStore();

    useEffect(() => {
        loadUser();  
        
    }, [loadUser]);
    
    // console.log(Object.keys(user), "USER");
    return (
        <div className="w-full mx-auto space-y-8 pt-16">
          {/* Welcome Section */}
          <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Bonjour, {user?.first_name} 👋</h1>
                    <p className="text-muted-foreground">Voici un aperçu de vos investissements</p>
                </div>
                <Link href={'/dashboard/creditRequest'}>
                <Button className="hidden sm:flex gap-2" >
                            <Users className="h-4 w-4" />
                            Demander un crédit
                        </Button>
                </Link>
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

            {/* Main Content */}
            <div className="grid gap-6 ">
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

                <div className="col-span-4 md:col-span-2 space-y-6">
                </div>
            </div>  
        </div>
    )
}
