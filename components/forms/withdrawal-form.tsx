// components/forms/withdrawal-form.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import useFeaturesStore from '@/stores/features'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
// import { useToast } from '@/components/ui/use-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export function WithdrawalForm() {
  const [amount, setAmount] = useState('')
  const [motif, setMotif] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const { withdrawRequest } = useFeaturesStore()
//   const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validation
      if (!amount || isNaN(Number(amount))) {
        throw new Error('Veuillez entrer un montant valide')
      }

      if (Number(amount) <= 0) {
        throw new Error('Le montant doit être supérieur à 0')
      }

      if (!motif || motif.length < 10) {
        throw new Error('Veuillez fournir un motif valide (au moins 10 caractères)')
      }

      // Appel API
      const response = await withdrawRequest({ 
        amount: Number(amount), 
        motif 
      })

        setSuccess(true)
     
    } catch (error) {
    //   toast({
    //     variant: "destructive",
    //     title: "Erreur",
    //     description: error instanceof Error ? error.message : 'Une erreur inattendue est survenue',
    //   })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Montant (BIF) <span className="text-destructive">*</span></Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Entrez le montant à retirer"
            required
            min="1000" 
            step="1000" 
          />
          <p className="text-sm text-muted-foreground">
            Le montant minimum de retrait est de 10,000 BIF
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="motif">Motif du retrait <span className="text-destructive">*</span></Label>
          <Textarea
            id="motif"
            value={motif}
            onChange={(e) => setMotif(e.target.value)}
            placeholder="Décrivez la raison de votre retrait (minimum 10 caractères)"
            rows={3}
            minLength={10}
            required
          />
        </div>

        <Button 
          type="submit" 
          className="w-full gap-2"
          disabled={isSubmitting || !amount || !motif}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            'Demander le retrait'
          )}
        </Button>
      </form>

      {/* Modal de succès */}
      <Dialog open={success} onOpenChange={setSuccess}>
        <DialogContent>
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-green-600"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="m9 11 3 3L22 4" />
                </svg>
              </div>
            </div>
            <DialogTitle className="text-center">Demande envoyée avec succès !</DialogTitle>
            <DialogDescription className="text-center">
              Votre demande de retrait de {new Intl.NumberFormat('fr-FR').format(Number(amount))} BIF a été enregistrée.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Détails de la demande</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Montant:</div>
                <div>{new Intl.NumberFormat('fr-FR').format(Number(amount))} BIF</div>
                <div className="text-muted-foreground">Motif:</div>
                <div className="line-clamp-2">{motif}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button 
              onClick={() =>{ setSuccess(false); setAmount(''); setMotif(''); }}
              className="bg-green-600 hover:bg-green-700"
            >
              Fermer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}