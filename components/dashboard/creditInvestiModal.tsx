'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { DollarSign, AlertCircle, CheckCircle2, PieChart } from 'lucide-react'
// import { useToast } from '@/components/ui/use-toast'
import { Slider } from '@/components/ui/slider'
import useFeaturesStore from '@/stores/features'

interface InvestmentModalProps {
  creditId: number
  montant_part: string | number  // Accepte string ou number
  remaining_budget: string | number
  isOpen: boolean
  onClose: () => void
  onInvest: (amount: number, parts: number) => Promise<void>,
  maxAmount:number,

}

export function InvestmentModal({
  creditId,
  montant_part,
  remaining_budget,
  maxAmount,
  isOpen,
  onClose,
  onInvest,
}: InvestmentModalProps) {
  // Conversion sécurisée en nombres
  const minAmount = typeof montant_part === 'string' ? parseFloat(montant_part) : montant_part

  const [amount, setAmount] = useState('')
  const [parts, setParts] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
//   const { toast } = useToast()
const {InvestissementsCredit} = useFeaturesStore()

  // Formatage devise XOF sécurisé
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Calcul des parts
  useEffect(() => {
    if (!amount || isNaN(minAmount) || minAmount <= 0) {
      setParts(0)
      return
    }

    const numericAmount = parseFloat(amount.replace(/\s/g, '')) || 0
    const calculatedParts = Math.floor(numericAmount / minAmount)
    setParts(isNaN(calculatedParts) ? 0 : calculatedParts)
  }, [amount, minAmount])

  // Gestion du changement de montant
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setAmount(value ? parseInt(value).toLocaleString('fr-FR') : '')
    setError('')
  }

  // Ajustement via le slider
  const handleSliderChange = (value: number[]) => {
    const sliderValue = value[0]
    const newAmount = Math.floor((sliderValue / 100) * maxAmount)
    setAmount(newAmount.toLocaleString('fr-FR'))
  }

  const sliderValue = (100*amount)/(parseFloat(maxAmount)*3/100)
  
  // Validation et soumission
  const handleInvest = async () => {
    const numericAmount = parseFloat(amount.replace(/\s/g, '')) || 0
    
    if (numericAmount < minAmount) {
      setError(`Le montant minimum est de ${formatCurrency(minAmount)} (1 part)`)
      return
    }

    if (numericAmount > maxAmount) {
      setError(`Le montant maximum est de ${formatCurrency(maxAmount)}`)
      return
    }

    setIsLoading(true)
    try {
     const result = await InvestissementsCredit({montant:numericAmount,part: parts, credit:creditId})
    //   toast({
    //     title: 'Investissement réussi',
    //     description: `Vous avez investi ${formatCurrency(numericAmount)} pour ${parts} part(s)`,
    //     action: <CheckCircle2 className="text-green-500" />,
    //   })
     
      // setAmount('')
      console.log(result, "wojwirjiejrieorjiopejriweojrieireo=====+++");
      
      // onClose()
    } catch (err) {
    //   toast({
    //     title: 'Erreur',
    //     description: "Une erreur s'est produite",
    //     variant: 'destructive',
    //   })
    setError(err.response?.data.message || err?.message ||  'Une erreur est survenue')
    
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Investir dans le prêt #{creditId}
          </DialogTitle>
          <DialogDescription>
            Montant disponible: {formatCurrency(maxAmount)}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Montant
            </Label>
            <div className="col-span-3 relative">
              <Input
                id="amount"
                value={amount}
                onChange={handleAmountChange}
                placeholder={`Minimum ${formatCurrency(minAmount)}`}
                className="pl-8 text-base"
              />
              {/* <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                XOF
              </span> */}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Pourcentage</span>
              <span className="font-medium">{sliderValue}%</span>
            </div>
            <Slider
              value={[sliderValue]}
              onValueChange={handleSliderChange}
              max={100}
              step={1}
            />
          </div>

          <div className="bg-accent/50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                <span className="font-medium">Parts acquises:</span>
              </div>
              <span className="text-xl font-bold">{isNaN(parts) ? 0 : parts}</span>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {formatCurrency(minAmount)} par part
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-md">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button 
            onClick={handleInvest} 
            disabled={isLoading || !amount || parts < 1}
          >
            {isLoading ? 'Traitement...' : `Investir (${parts} part${parts > 1 ? 's' : ''})`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}