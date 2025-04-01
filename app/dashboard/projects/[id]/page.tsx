'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Calendar,
  Users,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Download,
  Clock,
  DollarSign,
  FileText,
  PieChart
} from "lucide-react"
import useFeaturesStore from "@/stores/features"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

export default function ProjectDetails() {
  const { project, isLoading, loadProjectBySlug } = useFeaturesStore();
  const [clientSide, setClientSide] = useState(false);
  const params = useParams();

  useEffect(() => {
    setClientSide(true);
    if (params.id) {
      loadProjectBySlug(params?.id);
      console.log(project, "======>");
      
    }

  }, [params?.id]);

  if (!clientSide || isLoading) {
    return <LoadingSkeleton />;
  }

  if (!project) {
    return <div className="p-8 text-center">Projet non trouvé</div>;
  }

  // Formatage des données
  const fundingPercentage = calculateFundingPercentage(project.budget, project.remaining_budget);
  const formattedData = {
    budget: formatCurrency(project.budget),
    remaining: formatCurrency(project.remaining_budget),
    collected: formatCurrency(Number(project.budget) - Number(project.remaining_budget)),
    interest: formatCurrency(project.interet_estimer),
    minInvestment: formatCurrency(Number(project.budget) * 0.05),
    createdDate: formatDate(project.create_date),
    duration: `${project.delai_realisation} jours`
  };

  return (
    <div className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto">
      {/* En-tête du projet */}
      <ProjectHeader 
        title={project.title}
        description={project.description}
        category={project.category}
        status={project.statut_label}
      />

      {/* Statistiques principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          icon={<DollarSign className="h-5 w-5" />}
          title="Budget total"
          value={formattedData.budget}
        />
        <StatCard 
          icon={<TrendingUp className="h-5 w-5" />}
          title="Rendement prévu"
          value={formattedData.interest}
        />
        <StatCard 
          icon={<Clock className="h-5 w-5" />}
          title="Durée"
          value={formattedData.duration}
        />
        <StatCard 
          icon={<Users className="h-5 w-5" />}
          title="Investisseurs"
          value={project.investissements?.length.toString()}
        />
      </div>

      {/* Contenu principal */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Aperçu</TabsTrigger>
              <TabsTrigger value="details">Détails</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <ProjectDescription description={project.description} />
              <ProjectObjectives objectives={project.objectives} />
              <ProjectRisks risks={project.risks} />
            </TabsContent>

            <TabsContent value="details">
              <ProjectDetailsTab 
                createDate={formattedData.createdDate}
                duration={formattedData.duration}
                location={project.location}
                category={project.category?.title}
              />
            </TabsContent>

            <TabsContent value="documents">
              <ProjectDocuments documents={project.documents} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar d'investissement */}
        <InvestmentSidebar
          fundingPercentage={fundingPercentage}
          budget={formattedData.budget}
          collected={formattedData.collected}
          interest={formattedData.interest}
          duration={formattedData.duration}
          minInvestment={formattedData.minInvestment}
          investorsCount={project.investissements?.length}
        />
      </div>
    </div>
  )
}


function LoadingSkeleton() {
  return (
    <div className="space-y-8 p-8 flex-1">
      <Skeleton className="h-10 w-1/2" />
      <div className="grid gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Skeleton className="h-[300px]" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-[350px]" />
          <Skeleton className="h-12" />
        </div>
      </div>
    </div>
  )
}

function ProjectHeader({ title, description, category, status }: { 
  title: string; 
  description: string; 
  category: { title: string }; 
  status: string 
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {category?.title}
            </Badge>
            <Badge variant={status === 'Ouvert' ? 'success' : 'secondary'}>
              {status}
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground mt-2 text-lg">{description}</p>
        </div>
        <Link href="/dashboard/investiNow">
        <Button size="lg" className="hidden md:flex" >
          Investir maintenant
        </Button>
        </Link>
      </div>
    </div>
  )
}

function StatCard({ icon, title, value }: { 
  icon: React.ReactNode; 
  title: string; 
  value: string 
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 pt-6">
        <div className="p-2 rounded-full bg-primary/10">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="font-medium">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function ProjectDescription({ description }: { description: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Description du projet</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          {description || "Aucune description détaillée disponible."}
        </p>
      </CardContent>
    </Card>
  )
}

function ProjectObjectives({ objectives }: { objectives: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Objectifs</CardTitle>
      </CardHeader>
      <CardContent>
        {objectives && objectives.length > 0 ? (
          <ul className="space-y-2">
            {objectives.map((obj, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">Aucun objectif défini.</p>
        )}
      </CardContent>
    </Card>
  )
}

function ProjectRisks({ risks }: { risks: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Risques potentiels</CardTitle>
      </CardHeader>
      <CardContent>
        {risks && risks.length > 0 ? (
          <ul className="space-y-2">
            {risks.map((risk, index) => (
              <li key={index} className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-1 text-orange-500 flex-shrink-0" />
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">Aucun risque identifié.</p>
        )}
      </CardContent>
    </Card>
  )
}

function ProjectDetailsTab({ createDate, duration, location, category }: { 
  createDate: string; 
  duration: string; 
  location: string | null; 
  category: string 
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations détaillées</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <DetailItem 
          icon={<Calendar className="h-5 w-5" />}
          title="Date de création"
          value={createDate}
        />
        <DetailItem 
          icon={<Clock className="h-5 w-5" />}
          title="Délai de réalisation"
          value={duration}
        />
        <DetailItem 
          icon={<MapPin className="h-5 w-5" />}
          title="Localisation"
          value={location || "Non spécifiée"}
        />
        <DetailItem 
          icon={<PieChart className="h-5 w-5" />}
          title="Catégorie"
          value={category}
        />
      </CardContent>
    </Card>
  )
}

function ProjectDocuments({ documents }: { documents: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents du projet</CardTitle>
      </CardHeader>
      <CardContent>
        {documents && documents.length > 0 ? (
          <div className="space-y-3">
            {documents.map((doc, index) => (
              <Button 
                key={index} 
                variant="outline" 
                className="w-full justify-start gap-2"
              >
                <FileText className="h-4 w-4" />
                {doc.name || `Document ${index + 1}`}
                <Download className="h-4 w-4 ml-auto" />
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Aucun document disponible.</p>
        )}
      </CardContent>
    </Card>
  )
}

function InvestmentSidebar({
  fundingPercentage,
  budget,
  collected,
  interest,
  duration,
  minInvestment,
  investorsCount
}: {
  fundingPercentage: number;
  budget: string;
  collected: string;
  interest: string;
  duration: string;
  minInvestment: string;
  investorsCount: number;
}) {
  return (
    <div className="space-y-6">
      <Card className="sticky top-6">
        <CardHeader>
          <CardTitle>Investir dans ce projet</CardTitle>
          <CardDescription>
            Rejoignez les {investorsCount} investisseurs qui soutiennent déjà ce projet
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Progression</span>
              <span className="text-sm font-medium">{fundingPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={fundingPercentage} className="h-2" />
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-muted-foreground">Collecté</p>
                <p className="font-medium">{collected}</p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground">Objectif</p>
                <p className="font-medium">{budget}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Avantages clés</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Rendement prévu: {interest}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Durée: {duration}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Investissement minimum: {minInvestment}</span>
              </li>
            </ul>
          </div>

          <Button size="lg" className="w-full">
            Investir maintenant
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function DetailItem({ icon, title, value }: { 
  icon: React.ReactNode; 
  title: string; 
  value: string 
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-full bg-primary/10 mt-1">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  )
}

// Fonctions utilitaires
function calculateFundingPercentage(budget: string, remaining: string): number {
  const budgetNum = Number(budget);
  const remainingNum = Number(remaining);
  return ((budgetNum - remainingNum) / budgetNum) * 100;
}

function formatCurrency(amount: string | number): string {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numericAmount)) return "0,00 €";
  
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numericAmount);
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "Non spécifiée";
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return new Date(dateString).toLocaleDateString('fr-FR', options);
}