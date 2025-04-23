'use client'

import { Settings2, User, Lock, Bell, CreditCard, HelpCircle, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function SettingsPage() {
  return (
    <div className="container py-8">
      <div className="flex items-center gap-4 mb-8">
        <Settings2 className="h-8 w-8 text-primary" />
        <h1 className="text-2xl sm:text-3xl font-bold">Paramètres</h1>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 max-w-4xl">
          <TabsTrigger value="account">
            <User className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Compte</span>
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Sécurité</span>
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Paiements</span>
          </TabsTrigger>
          <TabsTrigger value="support">
            <HelpCircle className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Support</span>
          </TabsTrigger>
          <TabsTrigger value="logout" className="text-red-500">
            <LogOut className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Déconnexion</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Profil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-4 mb-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/avatar.png" />
                    <AvatarFallback>US</AvatarFallback>
                  </Avatar>
                  <Button variant="outline">Changer la photo</Button>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" type="tel" defaultValue="+225 07 00 00 00 00" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Préférences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="language">Langue</Label>
                  <p className="text-sm text-muted-foreground">
                    Choisissez votre langue préférée
                  </p>
                </div>
                <select
                  id="language"
                  className="bg-background border rounded-md px-3 py-2 text-sm"
                  defaultValue="fr"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                </select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="theme">Thème</Label>
                  <p className="text-sm text-muted-foreground">
                    Choisissez entre clair ou sombre
                  </p>
                </div>
                <select
                  id="theme"
                  className="bg-background border rounded-md px-3 py-2 text-sm"
                  defaultValue="system"
                >
                  <option value="light">Clair</option>
                  <option value="dark">Sombre</option>
                  <option value="system">Système</option>
                </select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="timezone">Fuseau horaire</Label>
                  <p className="text-sm text-muted-foreground">
                    Définissez votre fuseau horaire local
                  </p>
                </div>
                <select
                  id="timezone"
                  className="bg-background border rounded-md px-3 py-2 text-sm"
                  defaultValue="Africa/Abidjan"
                >
                  <option value="Africa/Abidjan">Abidjan (GMT+0)</option>
                  <option value="Europe/Paris">Paris (GMT+1)</option>
                </select>
              </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mot de passe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Mot de passe actuel</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">Nouveau mot de passe</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button className="mt-4 w-full sm:w-auto">Mettre à jour</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Authentification à deux facteurs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <Label>Vérification en deux étapes</Label>
                    <p className="text-sm text-muted-foreground">
                      Ajoutez une couche de sécurité supplémentaire à votre compte
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de notification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notifications par email</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevez des notifications importantes par email
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notifications push</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevez des notifications sur votre appareil
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notifications SMS</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevez des notifications importantes par SMS
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Méthodes de paiement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <CreditCard className="h-6 w-6" />
                      <div>
                        <p className="font-medium">Carte Visa •••• 4242</p>
                        <p className="text-sm text-muted-foreground">Expire le 12/24</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Ajouter une méthode de paiement
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Historique des paiements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Abonnement Premium</p>
                      <p className="text-sm text-muted-foreground">15 janvier 2023</p>
                    </div>
                    <p className="font-medium">10 000 XOF</p>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Abonnement Premium</p>
                      <p className="text-sm text-muted-foreground">15 décembre 2022</p>
                    </div>
                    <p className="font-medium">10 000 XOF</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="support" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Support technique</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div>
                  <h3 className="font-medium mb-2">Centre d'aide</h3>
                  <p className="text-muted-foreground">
                    Consultez notre centre d'aide pour trouver des réponses à vos questions.
                  </p>
                  <Button variant="link" className="pl-0 mt-2">
                    Visiter le centre d'aide
                  </Button>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Contacter le support</h3>
                  <p className="text-muted-foreground">
                    Notre équipe est disponible 24/7 pour vous aider.
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline">Envoyer un email</Button>
                    <Button variant="outline">Chat en direct</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logout" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Déconnexion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Vous êtes sur le point de vous déconnecter de votre compte.
                </p>
                <Button variant="destructive" className="w-full sm:w-auto">
                  Se déconnecter
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}