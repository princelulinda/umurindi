'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, CalendarDays, Clock, DollarSign, Percent, Shield, Users, AlertCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import useFeaturesStore from '@/stores/features'
import { Skeleton } from '@/components/ui/skeleton'
import { InvestmentModal } from '@/components/dashboard/creditInvestiModal'

export default function CreditDetailPage() {
  const { id } = useParams()
  const { credit, isLoading, loadCredit } = useFeaturesStore()
  const [creditDetail, setCreditDetail] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    loadCredit().then(() => {
      const foundCredit = credit?.find(c => c.id === Number(id))
      setCreditDetail(foundCredit)
    })
  }, [id])

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'BIF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(parseFloat(value))
  }

  const calculateProgress = () => {
    if (!creditDetail) return 0
    const invested = parseFloat(creditDetail.total_investment || '0')
    const total = parseFloat(creditDetail.montant || '1')
    return Math.min(100, Math.round((invested / total) * 100))
  }

  if (isLoading || !creditDetail) {
    return (
      <div className="container py-8">
        <div className="flex flex-col gap-8">
          <Skeleton className="h-10 w-24" />
          
          <div className="grid gap-6 md:grid-cols-3">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6 sm:py-8">
      {/* Bouton de retour */}
      <Link href="/dashboard/credit" className="inline-block mb-6">
        <Button variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Retour aux crédits
        </Button>
      </Link>

      {/* En-tête */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Prêt #{creditDetail.id}</h1>
          <p className="text-muted-foreground">{creditDetail.motif}</p>
        </div>
        <Badge variant={creditDetail.statut_label === 'Validé' ? 'default' : 'outline'}>
          {creditDetail.statut_label === 'Validé' && <CheckCircle className="h-4 w-4 mr-2" />}
          {creditDetail.statut_label}
        </Badge>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Montant total</p>
                <p className="text-2xl font-bold">{formatCurrency(creditDetail.montant)}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taux d'intérêt</p>
                <p className="text-2xl font-bold">{creditDetail.taux_interet}%</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <Percent className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Durée</p>
                <p className="text-2xl font-bold">{creditDetail.delai_rembourssement} mois</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <CalendarDays className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progression et Détails */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Progression du financement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">
                    {formatCurrency(creditDetail.total_investment || '0')} investis
                  </span>
                  <span className="text-sm font-medium">
                    {formatCurrency(creditDetail.remaining_budget)} restants
                  </span>
                </div>
                <Progress value={calculateProgress()} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">
                  {calculateProgress()}% du montant total atteint
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Caution</p>
                    <p className="text-sm text-muted-foreground">{creditDetail.causion}% du montant</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Investisseurs</p>
                    <p className="text-sm text-muted-foreground">0 participants</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Détails du prêt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Description</h3>
                <p className="text-sm text-muted-foreground">
                  {creditDetail.motif || 'Aucune description disponible'}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Conditions</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Montant minimum par investisseur : {formatCurrency(creditDetail.montant_part)}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Remboursement mensuel sur {creditDetail.delai_rembourssement} mois</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Taux d'intérêt fixe de {creditDetail.taux_interet}%</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="max-w-lg">
          <h3 className="font-medium mb-2">Intéressé par ce prêt ?</h3>
          <p className="text-sm text-muted-foreground">
            Investissez dans ce projet et bénéficiez d'un retour sur investissement garanti.
          </p>
        </div>
        <Button 
        onClick={() => setIsModalOpen(true)}
        size="lg" className="w-full sm:w-auto">
          Investir maintenant
        </Button>
      </div>
      <InvestmentModal
        creditId={creditDetail.id}
        minAmount={parseFloat(creditDetail.montant_part)}
        maxAmount={parseFloat(creditDetail.remaining_budget)}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        montant_part={creditDetail.montant_part}
        onInvest={async (amount, parts) => {
            console.log(amount, parts);

        }}
        
/>
    </div>
  )
}