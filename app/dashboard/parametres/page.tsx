'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Settings, User, Bell, Sun, Globe } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function ParametresPage() {
  return (
    <div className="flex-1 h-full bg-background">
      <div className="h-full p-8 pt-6 space-y-8 overflow-auto lg:w-[130vh]">
        {/* En-tête */}
        <div className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <Settings className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
              <p className="text-muted-foreground mt-2">
                Gérez vos préférences et personnalisez votre expérience
              </p>
            </div>
          </div>
        </div>

        {/* Profil */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profil
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button variant="outline">Changer la photo</Button>
                <Button variant="ghost">Supprimer</Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Prénom</Label>
                <Input placeholder="Votre prénom" />
              </div>
              <div className="space-y-2">
                <Label>Nom</Label>
                <Input placeholder="Votre nom" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="votre@email.com" />
              </div>
              <div className="space-y-2">
                <Label>Téléphone</Label>
                <Input type="tel" placeholder="+257 XX XX XX XX" />
              </div>
            </div>
            <Button>Enregistrer les modifications</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Notifications par email</p>
                <p className="text-sm text-muted-foreground">
                  Recevoir des mises à jour par email
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Notifications push</p>
                <p className="text-sm text-muted-foreground">
                  Recevoir des notifications sur votre appareil
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Résumé hebdomadaire</p>
                <p className="text-sm text-muted-foreground">
                  Recevoir un résumé de vos activités
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Apparence */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5" />
              Apparence
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Thème</Label>
              <Select defaultValue="system">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un thème" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Clair</SelectItem>
                  <SelectItem value="dark">Sombre</SelectItem>
                  <SelectItem value="system">Système</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Langue */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Langue et région
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Langue</Label>
              <Select defaultValue="fr">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une langue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="kr">Kirundi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Format de date</Label>
              <Select defaultValue="dd/mm/yyyy">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd/mm/yyyy">JJ/MM/AAAA</SelectItem>
                  <SelectItem value="mm/dd/yyyy">MM/JJ/AAAA</SelectItem>
                  <SelectItem value="yyyy/mm/dd">AAAA/MM/JJ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Devise</Label>
              <Select defaultValue="bif">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une devise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bif">BIF - Franc Burundais</SelectItem>
                  <SelectItem value="usd">USD - Dollar Américain</SelectItem>
                  <SelectItem value="eur">EUR - Euro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Données et confidentialité */}
        <Card>
          <CardHeader>
            <CardTitle>Données et confidentialité</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Partage des données d&apos;utilisation</p>
                <p className="text-sm text-muted-foreground">
                  Nous aider à améliorer nos services
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="pt-4 space-y-4">
              <Button variant="outline" className="w-full">
                Exporter mes données
              </Button>
              <Button variant="destructive" className="w-full">
                Supprimer mon compte
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
