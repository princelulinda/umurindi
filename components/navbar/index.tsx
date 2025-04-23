'use client'

import { Bell, Search, Settings, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useSidebar } from '../ui/sidebar' 

export default function Navbar() {
  const { toggleSidebar } = useSidebar() 

  return (
    <nav className="fixed top-0 right-0 w-full lg:w-[calc(100%-256px)] z-50 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Partie gauche (menu mobile + recherche) */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1">
          {/* Bouton menu mobile - visible seulement sur petits écrans */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden mr-2"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Search - s'adapte à la largeur disponible */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher..."
              className="pl-10 bg-muted/50 w-full"
            />
          </div>
        </div>

        {/* Partie droite (icônes) */}
        <div className="flex items-center gap-2 sm:gap-4 ml-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                aria-label="Notifications"
              >
                <Bell className="h-[1.2rem] w-[1.2rem]" />
                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 sm:w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 sm:p-4">
                <p className="text-sm font-medium">Nouvelle commande reçue</p>
                <p className="text-xs text-muted-foreground">Il y a 5 minutes</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 sm:p-4">
                <p className="text-sm font-medium">Mise à jour du système</p>
                <p className="text-xs text-muted-foreground">Il y a 1 heure</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings - caché sur mobile */}
          <Button 
            variant="ghost" 
            size="icon"
            className="hidden sm:inline-flex"
            aria-label="Paramètres"
          >
            <Settings className="h-[1.2rem] w-[1.2rem]" />
          </Button>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-8 w-8 rounded-full"
                aria-label="Menu profil"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatar.png" alt="Avatar" />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">Profil</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Paramètres</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-500">
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}