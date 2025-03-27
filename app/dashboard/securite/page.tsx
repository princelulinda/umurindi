'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Shield, Key, Smartphone, History, Bell } from 'lucide-react'

export default function SecuritePage() {
  return (
    <div className="flex-1 h-full bg-background">
      <div className="h-full p-8 pt-6 space-y-8 overflow-auto lg:w-[130vh]">
        {/* En-tête */}
        <div className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Sécurité</h1>
              <p className="text-muted-foreground mt-2">
                Gérez la sécurité de votre compte et vos préférences de confidentialité
              </p>
            </div>
          </div>
        </div>

        {/* Authentification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Authentification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Mot de passe actuel</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label>Nouveau mot de passe</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label>Confirmer le nouveau mot de passe</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <Button>Mettre à jour le mot de passe</Button>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Authentification à deux facteurs</p>
                  <p className="text-sm text-muted-foreground">
                    Ajoutez une couche de sécurité supplémentaire à votre compte
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appareils connectés */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Appareils connectés
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { device: 'iPhone 13', location: 'Bujumbura, Burundi', lastActive: 'Actif maintenant' },
              { device: 'MacBook Pro', location: 'Gitega, Burundi', lastActive: 'Il y a 2 heures' },
              { device: 'Chrome - Windows', location: 'Ngozi, Burundi', lastActive: 'Il y a 3 jours' },
            ].map((session, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{session.device}</p>
                  <p className="text-sm text-muted-foreground">{session.location}</p>
                  <p className="text-sm text-muted-foreground">{session.lastActive}</p>
                </div>
                <Button variant="outline" size="sm">Déconnecter</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Historique de connexion */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Historique de connexion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: '24 Mars 2025, 10:30', location: 'Bujumbura, Burundi', status: 'Réussi' },
                { date: '23 Mars 2025, 15:45', location: 'Gitega, Burundi', status: 'Réussi' },
                { date: '22 Mars 2025, 08:15', location: 'Inconnu', status: 'Échoué' },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{log.date}</p>
                    <p className="text-sm text-muted-foreground">{log.location}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    log.status === 'Réussi' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications de sécurité */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications de sécurité
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Nouvelles connexions</p>
                <p className="text-sm text-muted-foreground">
                  Recevoir une notification lors d&apos;une nouvelle connexion
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Tentatives de connexion suspectes</p>
                <p className="text-sm text-muted-foreground">
                  Recevoir une notification en cas d&apos;activité suspecte
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Changements de mot de passe</p>
                <p className="text-sm text-muted-foreground">
                  Recevoir une notification lors d&apos;un changement de mot de passe
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
