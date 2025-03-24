import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ArrowRight, Download, Share2 } from "lucide-react"

const actions = [
  {
    title: "Nouveau Projet",
    description: "Créer un nouveau projet d'investissement",
    icon: Plus,
    variant: "default" as const,
  },
  {
    title: "Rapport Mensuel",
    description: "Télécharger le rapport du mois",
    icon: Download,
    variant: "outline" as const,
  },
  {
    title: "Partager",
    description: "Inviter des investisseurs",
    icon: Share2,
    variant: "outline" as const,
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Actions Rapides</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {actions.map((action) => (
          <Button
            key={action.title}
            variant={action.variant}
            className="w-full justify-start gap-4 h-auto py-4"
          >
            <div className="p-2 rounded-full bg-primary/10">
              <action.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-medium">{action.title}</h3>
              <p className="text-xs text-muted-foreground">{action.description}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
