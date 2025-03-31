"use client";

import useFeaturesStore from "@/stores/features"
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

import { useEffect } from "react"

interface Props {
    slug: string
}

const ProjectDetail = ({ slug }: Props) => {

    const { project, isLoading, loadProjectBySlug } = useFeaturesStore();

    loadProjectBySlug(slug);
    
    
      if (isLoading || !project) {
        return <p>Chargement</p>;
      }

    return (
        <div className="space-y-8 p-8 flex-1">
      {/* En-tête */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge>{project.category.title}</Badge>
              <Badge variant="outline">{project.statut_label}</Badge>
            </div>
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <p className="text-muted-foreground mt-2">{project.description}</p>
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
                <p className="font-medium">{project.location}</p>
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
                <p className="font-medium">{project.start_date}</p>
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
                <p className="font-medium">{project.investissements.length}</p>
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
                <p className="font-medium">{project.expectedReturn}</p>
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
              src={project.image}
              alt={project.title}
              className="w-full h-[300px] object-cover"
            />
          </Card>
      
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
                  <span className="text-sm font-medium">{project.total_investment}%</span>
                </div>
                <Progress value={project.total_investment} className="h-2" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Collecté</span>
                  <span className="font-medium">{project.currentlyRaised}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Investissement minimum</p>
                <p className="text-2xl font-bold">{project.minInvestment}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Rendement prévu: {project.expectedReturn}</span>
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


export default ProjectDetail