'use client'

import { useState, useEffect, useCallback } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog'
// import { useToast } from '@/components/ui/use-toast'
import useFeaturesStore from '@/stores/features'
import { Loader2 } from 'lucide-react'

interface Credit {
  id: number
  montant: string
  delai_rembourssement: number
  motif: string
  statut: number
  taux_interet: string
  statut_label: string
  calendrier_remboursement: Array<{
    mois: number
    date_remboursement: string
    reste: number
    montant: number
    interet: number
    montant_a_rembourser: number
  }>
}

export default function CreditsPage() {
  const { credit: credits, isLoading, loadCreditList, cancelCredit } = useFeaturesStore()
  const [selectedCredit, setSelectedCredit] = useState<Credit | null>(null)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [processing, setProcessing] = useState(false)
//   const { toast } = useToast()

  // Chargement initial des crédits
  const fetchCredits = useCallback(async () => {
    try {
      await loadCreditList()
    } catch (error) {
      console.error('Failed to load credits:', error)
    //   toast({
    //     title: "Erreur",
    //     description: "Impossible de charger les crédits",
    //     variant: "destructive"
    //   })
    }
  }, [loadCreditList])

  useEffect(() => {
    fetchCredits()
  }, [fetchCredits])

  const formatCurrency = (value: number | string) => {
    const num = typeof value === 'string' ? parseFloat(value) : value
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'BIF',
      minimumFractionDigits: 2
    }).format(num)
  }

  const handleCancelCredit = async () => {
    if (!selectedCredit) return
    
    setProcessing(true)
    try {
      await cancelCredit(selectedCredit.slug)
    //   toast({
    //     title: "Succès",
    //     description: "Le crédit a été annulé avec succès.",
    //     variant: "default"
    //   })
      setSelectedCredit(null)
      setShowCancelDialog(false)
      await fetchCredits() // Recharger les crédits après annulation
    } catch (error) {
      console.error('Failed to cancel credit:', error)
    //   toast({
    //     title: "Erreur",
    //     description: "Une erreur est survenue lors de l'annulation du crédit.",
    //     variant: "destructive"
    //   })
    } finally {
      setProcessing(false)
    }
  }

  const calculatePenalty = (credit: Credit) => {
    if (credit.statut === 1) {
      const totalInterest = credit.calendrier_remboursement.reduce(
        (sum, echeance) => sum + echeance.interet, 0
      )
      return totalInterest * 0.3
    }
    return 0
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!isLoading && (!credits || credits.length === 0)) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Gestion des Crédits</h1>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucun crédit trouvé</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Gestion des Crédits</h1>
      
      <Tabs 
        value={selectedCredit ? "details" : "liste"} 
        className="w-full"
        onValueChange={(value) => {
          if (value === "liste") setSelectedCredit(null)
        }}
      >
        <TabsList className="grid w-full grid-cols-2 max-w-xs mb-6">
          <TabsTrigger value="liste">Liste des crédits</TabsTrigger>
          <TabsTrigger value="details" disabled={!selectedCredit}>
            Détails
          </TabsTrigger>
        </TabsList>

        <TabsContent value="liste">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {credits?.map(credit => (
              <Card 
                key={credit.id} 
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => setSelectedCredit(credit)}
              >
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Crédit #{credit.id}</span>
                    <Badge variant={credit.statut === 1 ? 'default' : 'secondary'}>
                      {credit.statut_label}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Montant:</span>
                      <span>{formatCurrency(credit.montant)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Taux:</span>
                      <span>{credit.taux_interet}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Durée:</span>
                      <span>{credit.delai_rembourssement} mois</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="details">
          {selectedCredit && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Détails du crédit #{selectedCredit.id}</CardTitle>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => setShowCancelDialog(true)}
                      disabled={processing}
                    >
                      Annuler ce crédit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Informations générales</h3>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Montant:</span>
                      <span>{formatCurrency(selectedCredit.montant)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Taux d'intérêt:</span>
                      <span>{selectedCredit.taux_interet}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Durée:</span>
                      <span>{selectedCredit.delai_rembourssement} mois</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Statut:</span>
                      <Badge variant={selectedCredit.statut === 1 ? 'default' : 'secondary'}>
                        {selectedCredit.statut_label}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Détails supplémentaires</h3>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Motif:</span>
                      <span className="capitalize">{selectedCredit.motif}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Calendrier de remboursement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Mois</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Capital restant</TableHead>
                          <TableHead>Capital</TableHead>
                          <TableHead>Intérêt</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedCredit.calendrier_remboursement.map(echeance => (
                          <TableRow key={echeance.mois}>
                            <TableCell>{echeance.mois}</TableCell>
                            <TableCell>
                              {format(new Date(echeance.date_remboursement), 'dd MMM yyyy', { locale: fr })}
                            </TableCell>
                            <TableCell>{formatCurrency(echeance.reste)}</TableCell>
                            <TableCell>{formatCurrency(echeance.montant)}</TableCell>
                            <TableCell>{formatCurrency(echeance.interet)}</TableCell>
                            <TableCell className="text-right font-medium">
                              {formatCurrency(echeance.montant_a_rembourser)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedCredit(null)}
                  disabled={processing}
                >
                  Retour à la liste
                </Button>
                <Button disabled={processing}>
                  Télécharger le plan
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Modal d'annulation de crédit */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
  <DialogContent className="sm:max-w-[600px]">
    <div className="flex flex-col md:flex-col gap-6">
      {/* Illustration */}
      <div className="hidden md:flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-destructive"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
        </svg>
        <h3 className="mt-4 font-semibold text-center text-destructive">
          Annulation de crédit
        </h3>
      </div>

      {/* Contenu principal */}
      <div className="w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Annuler le crédit #{selectedCredit?.id}
          </DialogTitle>
          <DialogDescription className="mt-2">
            Vous êtes sur le point d'annuler définitivement ce crédit.
          </DialogDescription>
        </DialogHeader>

        <div className="my-6 space-y-4">
          {/* Section Statut */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Statut actuel</h4>
            <div className="flex items-center gap-2">
              <Badge variant={selectedCredit?.statut === 1 ? 'default' : 'secondary'}>
                {selectedCredit?.statut_label}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {selectedCredit?.statut === 1 
                  ? "Crédit validé et en cours" 
                  : "Crédit non validé"}
              </span>
            </div>
          </div>

          {/* Section Conséquences */}
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-100 dark:border-red-900/30">
            <h4 className="font-medium mb-2 text-destructive">Conséquences</h4>
            {selectedCredit?.statut === 1 ? (
              <ul className="space-y-2 text-sm list-disc pl-5">
                <li>
                  Pénalité de{' '}
                  <span className="font-bold text-destructive">
                    {selectedCredit && formatCurrency(calculatePenalty(selectedCredit))}
                  </span>{' '}
                  à payer immédiatement
                </li>
                <li>Clôture anticipée du contrat de crédit</li>
                <li>Impact possible sur votre historique de crédit</li>
              </ul>
            ) : (
              <p className="text-sm">
                Aucune pénalité ne sera appliquée car le crédit n'a pas encore été validé.
              </p>
            )}
          </div>

          {/* Section Détails */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
            <h4 className="font-medium mb-2">Détails du crédit</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">Montant initial</p>
                <p>{selectedCredit && formatCurrency(selectedCredit.montant)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Taux d'intérêt</p>
                <p>{selectedCredit?.taux_interet}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Durée restante</p>
                <p>{selectedCredit?.delai_rembourssement} mois</p>
              </div>
              <div>
                <p className="text-muted-foreground">Motif</p>
                <p className="capitalize">{selectedCredit?.motif}</p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <div className="text-xs text-muted-foreground">
            <p>Action irréversible. Consultez notre politique d'annulation.</p>
          </div>
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button 
                variant="outline" 
                disabled={processing}
                className="min-w-24"
              >
                Retour
              </Button>
            </DialogClose>
            <Button 
              variant="destructive" 
              onClick={handleCancelCredit}
              disabled={processing}
              className="min-w-24"
            >
              {processing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Confirmation...
                </>
              ) : (
                "Confirmer"
              )}
            </Button>
          </div>
        </DialogFooter>
      </div>
    </div>
  </DialogContent>
</Dialog>
    </div>
  )
}