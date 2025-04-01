'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { DollarSign, ChevronLeft, CheckCircle2, PieChart, TrendingUp, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import useFeaturesStore from "@/stores/features"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function InvestmentForm() {
  const router = useRouter()
  const [amount, setAmount] = useState(0)
  const [motif, setMotif] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const investiNow = useFeaturesStore((state) => state.investiNow)
  const project = useFeaturesStore((state) => state.project)
  
  useEffect(() => {
    if (project?.budget_part) {
      setAmount(Number(project.budget_part))
    }
  }, [project])

  const minInvestment = project?.budget_part ? Number(project.budget_part) : 0
  const maxInvestment = project?.remaining_budget ? Number(project.remaining_budget) : 0
  const parts = minInvestment > 0 ? Math.floor(amount / minInvestment) : 0
  const remainingParts = minInvestment > 0 && project?.remaining_budget 
    ? Math.floor(Number(project.remaining_budget) / minInvestment) 
    : 0
  const estimatedReturn = project?.budget && project?.interet_estimer
    ? (amount * Number(project.interet_estimer)) / Number(project.budget)
    : 0
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'BIF',
      minimumFractionDigits: 0
    }).format(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      if (!amount || !parts || !motif || !project?.id) {
        throw new Error("Veuillez remplir tous les champs requis")
      }

      if (amount < minInvestment) {
        throw new Error(`Le montant minimum est de ${formatCurrency(minInvestment)}`)
      }

      if (amount > maxInvestment) {
        throw new Error(`Le montant maximum est de ${formatCurrency(maxInvestment)}`)
      }

      const result = await investiNow({
        montant: amount,
        part: parts,
        projet: project.id,
        motif
      })

    //   if (!result?.success) {
    //     throw new Error(result?.message || "Erreur lors de l'investissement")
    //   }
   
    } catch (error) {
      console.error("Erreur:", error)
      setError(error instanceof Error ? error?.response?.data.message : "Une erreur inattendue est survenue")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Chargement du projet...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="w-full mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => router.back()} className="pl-0">
            <ChevronLeft className="h-5 w-5 mr-2" />
            Retour
          </Button>
          <Badge variant="outline">{project?.category?.title || 'Non catégorisé'}</Badge>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{project?.title || 'Projet sans titre'}</h1>
              <p className="text-muted-foreground">{project?.description || 'Aucune description disponible'}</p>
            </div>

            <Card>
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Votre investissement
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Montant</Label>
                      <span className="font-medium">{formatCurrency(amount)}</span>
                    </div>
                    
                    {minInvestment > 0 && (
                      <>
                        <Slider
                          value={[amount]}
                          min={minInvestment}
                          max={maxInvestment}
                          step={minInvestment}
                          onValueChange={([value]) => setAmount(value)}
                          className="my-4"
                        />
                        
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Min: {formatCurrency(minInvestment)}</span>
                          <span>Max: {formatCurrency(maxInvestment)}</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4">
                      <div className="flex items-center gap-3">
                        <PieChart className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm">Parts</p>
                          <p className="font-bold">{parts}</p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm">Rendement estimé</p>
                          <p className="font-bold">{formatCurrency(estimatedReturn)}</p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motif">Motif de votre investissement <span className="text-destructive">*</span></Label>
                    <Textarea
                      id="motif"
                      placeholder="Pourquoi investissez-vous dans ce projet?"
                      value={motif}
                      onChange={(e) => setMotif(e.target.value)}
                      required
                      className="min-h-[100px]"
                    />
                    <p className="text-sm text-muted-foreground">
                      Ceci aidera le porteur de projet à mieux comprendre ses investisseurs.
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gap-2"
                    disabled={isSubmitting || !motif || !amount}
                  >
                    {isSubmitting ? "En cours..." : (
                      <>
                        Confirmer l'investissement <CheckCircle2 className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader className="border-b">
                <CardTitle>Détails du projet</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Valeur part</span>
                    <span className="font-medium">{formatCurrency(minInvestment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Parts disponibles</span>
                    <span className="font-medium">{remainingParts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Durée estimée</span>
                    <span className="font-medium">{project?.delai_realisation || 0} jours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="border-b">
                <CardTitle>Financement</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Progression</span>
                  <span className="font-medium">
                    {project?.budget && project?.remaining_budget
                      ? `${((Number(project.budget) - Number(project.remaining_budget)) / Number(project.budget) * 100).toFixed(1)}%`
                      : '0%'}
                  </span>
                </div>
                <Progress 
                  value={project?.budget && project?.remaining_budget
                    ? ((Number(project.budget) - Number(project.remaining_budget)) / Number(project.budget) * 100)
                    : 0} 
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Collecté: {formatCurrency(Number(project?.budget || 0) - Number(project?.remaining_budget || 0))}</span>
                  <span>Objectif: {formatCurrency(Number(project?.budget || 0))}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="border-b border-primary/20">
                <CardTitle className="text-primary">À savoir</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Rendement estimé: {formatCurrency(Number(project?.interet_estimer || 0))}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Paiement à l'échéance du projet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Investissement sécurisé et traçable</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}