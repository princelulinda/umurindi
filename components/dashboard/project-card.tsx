import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Project } from "@/types/projet"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, DollarSign, Clock, TrendingUp } from "lucide-react"

export function ProjectCard({ 
  title, 
  description, 
  budget, 
  total_investment, 
  remaining_budget,
  category, 
  image, 
  slug,
  delai_realisation,
  interet_estimer,
  statut_label
}: Project) {
  
  // Calcul du pourcentage de financement atteint
  const fundingPercentage = ((Number(budget) - Number(remaining_budget)) / Number(budget)) * 100;
  
  // Formatage des montants
  const formattedBudget = new Intl.NumberFormat('fr-FR', { 
    style: 'currency', 
    currency: 'BIF' 
  }).format(Number(budget));
  
  const formattedInterest = new Intl.NumberFormat('fr-FR', { 
    style: 'currency', 
    currency: 'BIF' 
  }).format(Number(interet_estimer));

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 border border-gray-100 dark:border-gray-800 group">
      {/* En-tête avec image */}
      <div className="relative  bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
        {/* {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-4xl font-bold text-gray-300 dark:text-gray-600">
              {title.charAt(0).toUpperCase()}
            </div>
          </div>
        )} */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" /> */}
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-white/90 dark:bg-gray-900/80 text-gray-800 dark:text-gray-200">
            {category.title}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant={statut_label === 'Ouvert' ? 'success' : 'secondary'}>
            {statut_label}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6 space-y-4">
        {/* Titre et description */}
        <div>
          <h3 className="font-bold text-lg truncate group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
            {description}
          </p>
        </div>

        {/* Métriques du projet */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <div>
              <p className="text-muted-foreground">Budget</p>
              <p className="font-medium">{formattedBudget}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <div>
              <p className="text-muted-foreground">Rendement</p>
              <p className="font-medium">{formattedInterest}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-primary" />
            <div>
              <p className="text-muted-foreground">Durée</p>
              <p className="font-medium">{delai_realisation} jours</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarDays className="h-4 w-4 text-primary" />
            <div>
              <p className="text-muted-foreground">Créé le</p>
              <p className="font-medium">31/03/2025</p>
            </div>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Financement</span>
            <span className="font-medium text-primary">
              {fundingPercentage.toFixed(1)}% atteint
            </span>
          </div>
          <Progress value={fundingPercentage} className="h-2" />
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>
              {new Intl.NumberFormat('fr-FR', { 
                style: 'currency', 
                currency: 'EUR' 
              }).format(Number(budget) - Number(remaining_budget))} collectés
            </span>
            <span>
              {new Intl.NumberFormat('fr-FR', { 
                style: 'currency', 
                currency: 'EUR' 
              }).format(Number(remaining_budget))} restants
            </span>
          </div>
        </div>

        {/* Bouton d'action */}
        <Link href={`/dashboard/projects/${slug}`} className="block w-full">
          <Button className="w-full mt-2" size="sm">
            Voir le projet
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}