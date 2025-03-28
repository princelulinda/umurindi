import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Percent, CalendarDays, AlertCircle } from "lucide-react"
import Link from "next/link"
import { id } from "date-fns/locale"

interface CreditCardProps {
  id: number
  title: string
  description: string
  amount: string
  duration: string
  interestRate: string
  requirements: string[]
  status: 'Disponible' | 'Limité' | 'Bientôt'
}

export function CreditCard({
  title,
  description,
  amount,
  duration,
  interestRate,
  requirements,
  status
}: CreditCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <Badge 
            variant={
              status === 'Disponible' 
                ? 'default'
                : status === 'Limité'
                ? 'secondary'
                : 'outline'
            }
          >
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Percent className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{interestRate}</p>
              <p className="text-xs text-muted-foreground">Taux d&apos;intérêt</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{duration}</p>
              <p className="text-xs text-muted-foreground">Durée</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Montant maximum</p>
          <p className="text-2xl font-bold text-primary">{amount}</p>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Conditions requises</p>
          <ul className="text-sm space-y-1">
            {requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="mt-auto pt-6">
        <Link href={`/dashboard/credit/1`}>
        <Button className="w-full">investir dans ce credit</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
