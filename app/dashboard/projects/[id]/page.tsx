'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin, 
  Calendar, 
  Target, 
  Users, 
  TrendingUp,
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  Download
} from "lucide-react"

// Simuler les données d'un projet
const projectData = {
  id: 1,
  title: 'Ferme Agricole Moderne',
  description: 'Projet d\'agriculture moderne utilisant des techniques innovantes pour augmenter la production de maïs et de riz',
  location: 'Gitega, Burundi',
  startDate: '15 Avril 2025',
  endDate: '15 Avril 2026',
  status: 'En cours',
  totalAmount: '5.000.000 BIF',
  minInvestment: '100.000 BIF',
  currentlyRaised: '3.250.000 BIF',
  investors: 28,
  progress: 65,
  expectedReturn: '15%',
  category: 'Agriculture',
  images: ['/pexels-clement-proust-363898785-31205726.jpg', '/pexels-safari-consoler-3290243-15897036.jpg', '/pexels-clement-proust-363898785-31205726.jpg'],
  objectives: [
    'Augmenter la production agricole de 200%',
    'Créer 50 emplois locaux',
    'Installer un système d\'irrigation moderne',
    'Former 100 agriculteurs aux nouvelles techniques'
  ],
  risks: [
    'Conditions climatiques défavorables',
    'Fluctuations des prix du marché',
    'Délais d\'importation des équipements',
    'Adaptation aux nouvelles technologies'
  ],
  team: [
    {
      name: 'Jean Ndayishimiye',
      role: 'Chef de projet',
      experience: '15 ans en agriculture'
    },
    {
      name: 'Marie Niyonzima',
      role: 'Agronome',
      experience: '8 ans en cultures vivrières'
    }
  ],
  documents: [
    'Plan d\'affaires détaillé',
    'Études de marché',
    'Certificats fonciers',
    'Permis d\'exploitation'
  ]
}

export default function ProjectDetails() {
  return (
    <div className="space-y-8 p-8 flex-1">
      {/* En-tête */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge>{projectData.category}</Badge>
              <Badge variant="outline">{projectData.status}</Badge>
            </div>
            <h1 className="text-3xl font-bold">{projectData.title}</h1>
            <p className="text-muted-foreground mt-2">{projectData.description}</p>
          </div>
        </div>

        {/* Stats principales */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 pt-6 lg:w-[130vh]">
              <div className="p-2 rounded-full bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Localisation</p>
                <p className="font-medium">{projectData.location}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="p-2 rounded-full bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Date de début</p>
                <p className="font-medium">{projectData.startDate}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="p-2 rounded-full bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Investisseurs</p>
                <p className="font-medium">{projectData.investors}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="p-2 rounded-full bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rendement prévu</p>
                <p className="font-medium">{projectData.expectedReturn}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Image du projet */}
          <Card className="overflow-hidden">
            <img 
              src={projectData.images[0]} 
              alt={projectData.title}
              className="w-full h-[300px] object-cover"
            />
          </Card>

          {/* Onglets d'information */}
          <Tabs defaultValue="details" className="space-y-4">
            <TabsList>
              <TabsTrigger value="details">Détails</TabsTrigger>
              <TabsTrigger value="team">Équipe</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Objectifs du projet</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {projectData.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Target className="h-5 w-5 text-primary mt-0.5" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Risques potentiels</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {projectData.risks.map((risk, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <span className="text-muted-foreground">{risk}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="team">
              <Card>
                <CardHeader>
                  <CardTitle>Équipe du projet</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {projectData.team.map((member, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                          <p className="text-sm text-muted-foreground">{member.experience}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Documents disponibles</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {projectData.documents.map((doc, index) => (
                      <li key={index} className="flex items-center justify-between py-2 border-b">
                        <div className="flex items-center gap-2">
                          <Download className="h-4 w-4 text-muted-foreground" />
                          <span>{doc}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          Télécharger
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Carte d'investissement */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Investir dans ce projet</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Progression</span>
                  <span className="text-sm font-medium">{projectData.progress}%</span>
                </div>
                <Progress value={projectData.progress} className="h-2" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Collecté</span>
                  <span className="font-medium">{projectData.currentlyRaised}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Investissement minimum</p>
                <p className="text-2xl font-bold">{projectData.minInvestment}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Rendement prévu: {projectData.expectedReturn}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Durée: 12 mois</span>
                </div>
              </div>

              <Button className="w-full">Investir maintenant</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Button variant="outline" className="w-full">
                Télécharger la présentation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
