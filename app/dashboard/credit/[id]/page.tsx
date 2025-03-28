'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, Percent,AlertCircle, CheckCircle2, Users, Building, ArrowRight } from "lucide-react"

// Simuler les données d'un crédit
const creditData = {
  id: 1,
  title: 'Crédit Agricole Plus',
  description: 'Solution de financement complète pour les projets agricoles et d\'élevage',
  amount: '10.000.000 BIF',
  minAmount: '1.000.000 BIF',
  duration: '24 mois',
  interestRate: '8%',
  status: 'Disponible',
  totalInvestors: 45,
  currentlyInvested: '8.500.000 BIF',
  progress: 85,
  requirements: [
    'Être agriculteur ou éleveur professionnel',
    'Avoir un projet viable et documenté',
    'Garanties requises (terrain, équipement)',
    'Expérience minimum de 2 ans dans le secteur'
  ],
  benefits: [
    'Taux d\'intérêt préférentiel',
    'Période de grâce de 3 mois',
    'Accompagnement technique',
    'Assurance récolte incluse'
  ],
  documents: [
    'Carte d\'identité',
    'Attestation d\'activité',
    'Plan d\'affaires',
    'États financiers des 2 dernières années',
    'Justificatifs des garanties'
  ],
  institution: {
    name: 'Banque Agricole du Burundi',
    type: 'Banque commerciale',
    rating: 4.5,
    projects: 156,
    yearsActive: 15
  }
}

export default function CreditDetails() {
  return (
    <div className="space-y-8 p-8 w-full mx-auto">
      {/* En-tête */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold lg:w-[130vh]">{creditData.title}</h1>
            <p className="text-muted-foreground mt-2">{creditData.description}</p>
          </div>
          <Badge variant="outline" className="h-6">
            {creditData.status}
          </Badge>
        </div>

        {/* Stats principales */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="p-2 rounded-full bg-primary/10">
                <Percent className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Taux d&apos;intérêt</p>
                <p className="text-2xl font-bold">{creditData.interestRate}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="p-2 rounded-full bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Durée</p>
                <p className="text-2xl font-bold">{creditData.duration}</p>
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
                <p className="text-2xl font-bold">{creditData.totalInvestors}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="p-2 rounded-full bg-primary/10">
                <Building className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Institution</p>
                <p className="text-2xl font-bold">{creditData.institution.rating}★</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Onglets d'information */}
          <Tabs defaultValue="details" className="space-y-4">
            <TabsList>
              <TabsTrigger value="details">Détails</TabsTrigger>
              <TabsTrigger value="requirements">Conditions</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Avantages du crédit</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {creditData.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>À propos de l&apos;institution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">{creditData.institution.name}</p>
                    <p className="text-sm text-muted-foreground">{creditData.institution.type}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Projets financés</p>
                      <p className="font-medium">{creditData.institution.projects}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Années d&apos;activité</p>
                      <p className="font-medium">{creditData.institution.yearsActive} ans</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="requirements">
              <Card>
                <CardHeader>
                  <CardTitle>Conditions requises</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {creditData.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Documents nécessaires</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {creditData.documents.map((doc, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <span className="text-muted-foreground">{doc}</span>
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
              <CardTitle>Investir dans ce crédit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Progression</span>
                  <span className="text-sm font-medium">{creditData.progress}%</span>
                </div>
                <Progress value={creditData.progress} className="h-2" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Investi</span>
                  <span className="font-medium">{creditData.currentlyInvested}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Montant minimum</p>
                <p className="text-2xl font-bold">{creditData.minAmount}</p>
              </div>

              <Button className="w-full">Investir maintenant</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Button variant="outline" className="w-full">
                Télécharger la brochure
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
