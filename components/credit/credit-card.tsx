import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Percent, CalendarDays, AlertCircle, DollarSign, Shield, CheckCircle } from "lucide-react"
import Link from "next/link"

interface LoanCardProps {
  id: number
  montant: string
  causion: string
  delai_rembourssement: number
  motif: string
  montant_part: string
  statut_label: string
  taux_interet: string
  total_investment: string
  remaining_budget: string
}

export function CreditCard({
  id,
  montant,
  causion,
  delai_rembourssement,
  motif,
  montant_part,
  statut_label,
  taux_interet,
  total_investment,
  remaining_budget
}: LoanCardProps) {
  // Formater les montants
  const formatCurrency = (value: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'BIF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(parseFloat(value))
  }

  return (
    <Card className="flex flex-col h-full w-full max-w-md mx-auto sm:max-w-full">
      <CardHeader className="p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-base sm:text-lg">Prêt #{id}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{motif}</p>
          </div>
          <Badge 
            variant={
              statut_label === 'Validé' 
                ? 'default'
                : 'outline'
            }
            className="flex items-center gap-1 text-xs sm:text-sm"
          >
            {statut_label === 'Validé' && <CheckCircle className="h-3 w-3" />}
            {statut_label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-3 sm:gap-4 p-4 sm:p-6">
        {/* Première ligne - Taux et Durée */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <div className="p-1 sm:p-2 rounded-full bg-primary/10">
              <Percent className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium">{taux_interet}%</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Taux d'intérêt</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1 sm:p-2 rounded-full bg-primary/10">
              <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium">{delai_rembourssement} mois</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Durée</p>
            </div>
          </div>
        </div>

        {/* Montants */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-2">
          <div>
            <p className="text-xs sm:text-sm font-medium mb-1">Montant total</p>
            <p className="text-xl sm:text-xl font-bold text-primary">{formatCurrency(montant)}</p>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium mb-1">Montant restant</p>
            <p className="text-lg sm:text-xl font-bold text-green-600">{formatCurrency(remaining_budget)}</p>
          </div>
        </div>

        {/* Caution et Part min. */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-2">
          <div className="flex items-center gap-2">
            <div className="p-1 sm:p-2 rounded-full bg-primary/10">
              <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium">{causion}%</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Caution</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1 sm:p-2 rounded-full bg-primary/10">
              <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium">{formatCurrency(montant_part)}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Part min.</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto p-4 sm:p-6 pt-0">
        <Link href={`/dashboard/credit/${id}`} className="w-full">
          <Button className="w-full text-xs sm:text-sm py-2 h-auto">
            Investir dans ce prêt
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}