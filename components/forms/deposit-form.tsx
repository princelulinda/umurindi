// components/forms/deposit-form.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
// import { useToast } from '@/components/ui/use-toast'

export function DepositForm() {
  const [amount, setAmount] = useState('')
//   const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // toast({
    //   title: "Demande de dépôt envoyée",
    //   description: `Vous avez demandé un dépôt de ${amount} BIF`,
    // })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="amount">Montant (BIF)</Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Entrez le montant à déposer"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Confirmer le dépôt
      </Button>
    </form>
  )
}