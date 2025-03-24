'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { HelpCircle, Search, MessageCircle, Book, Phone } from 'lucide-react'

const faqs = [
  {
    question: "Comment investir dans un projet ?",
    answer: "Pour investir dans un projet, suivez ces étapes : \n1. Accédez à la page des projets\n2. Sélectionnez le projet qui vous intéresse\n3. Cliquez sur 'Investir maintenant'\n4. Remplissez le formulaire avec le montant souhaité\n5. Confirmez votre investissement"
  },
  {
    question: "Comment suivre mes investissements ?",
    answer: "Vous pouvez suivre vos investissements dans la section 'Mes Investissements'. Vous y trouverez des informations détaillées sur chaque investissement, y compris les rendements, les paiements et l'état d'avancement."
  },
  {
    question: "Comment demander un crédit ?",
    answer: "Pour demander un crédit :\n1. Visitez la section 'Crédit'\n2. Choisissez le type de crédit qui vous convient\n3. Cliquez sur 'Demander'\n4. Remplissez le formulaire de demande\n5. Soumettez les documents requis"
  },
  {
    question: "Quels sont les documents requis pour un crédit ?",
    answer: "Les documents généralement requis sont :\n- Pièce d'identité valide\n- Justificatifs de revenus\n- Relevés bancaires des 3 derniers mois\n- Plan d'affaires (pour les crédits professionnels)\n- Garanties éventuelles"
  }
]

export default function AidePage() {
  return (
    <div className="flex-1 h-full bg-background">
      <div className="h-full p-8 pt-6 space-y-8 overflow-auto lg:w-[130vh]">
        {/* En-tête */}
        <div className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <HelpCircle className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Centre d&apos;aide</h1>
              <p className="text-muted-foreground mt-2">
                Trouvez des réponses à vos questions et obtenez de l&apos;aide
              </p>
            </div>
          </div>
        </div>

        {/* Barre de recherche */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher dans l'aide..."
            className="pl-9 bg-white dark:bg-gray-800"
          />
        </div>

        {/* Sections d'aide */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <MessageCircle className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold">Chat en direct</h3>
                <p className="text-sm text-muted-foreground">
                  Discutez avec notre équipe de support
                </p>
                <Button className="mt-4" variant="outline">
                  Démarrer le chat
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <Book className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold">Documentation</h3>
                <p className="text-sm text-muted-foreground">
                  Consultez nos guides détaillés
                </p>
                <Button className="mt-4" variant="outline">
                  Voir les guides
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <Phone className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold">Nous contacter</h3>
                <p className="text-sm text-muted-foreground">
                  Appelez-nous ou envoyez un email
                </p>
                <Button className="mt-4" variant="outline">
                  Voir les contacts
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Questions fréquentes</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground whitespace-pre-line">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Formulaire de contact */}
        <Card>
          <CardHeader>
            <CardTitle>Nous contacter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nom</label>
                  <Input placeholder="Votre nom" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="votre@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Sujet</label>
                <Input placeholder="Sujet de votre message" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea
                  className="w-full min-h-[100px] p-3 rounded-md border bg-transparent"
                  placeholder="Votre message..."
                />
              </div>
              <Button>Envoyer le message</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
