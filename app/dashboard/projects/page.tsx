'use client'

import { useState } from 'react'
import { ProjectCard } from '@/components/dashboard/project-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Search, Filter } from 'lucide-react'
import ProjectItem from '@/components/ProjectItem'

// Données de test pour les projets
const projects = [
  {
    id: 1,
    title: 'Ferme Agricole Moderne',
    description: 'Projet d\'agriculture moderne utilisant des techniques innovantes pour augmenter la production',
    amount: '5.000.000 BIF',
    progress: 65,
    category: 'Agriculture',
    image: '/pexels-clement-proust-363898785-31205726.jpg',
    location: 'Gitega',
    expectedReturn: '15%',
    status: 'En cours',
  },
  {
    id: 2,
    title: 'Élevage de Volailles',
    description: 'Installation d\'une ferme avicole moderne pour la production d\'œufs et de viande',
    amount: '3.000.000 BIF',
    progress: 40,
    category: 'Élevage',
    image: '/pexels-safari-consoler-3290243-15897036.jpg',
    location: 'Bujumbura',
    expectedReturn: '12%',
    status: 'Nouveau',
  },
  {
    id: 3,
    title: 'Commerce de Produits Locaux',
    description: 'Création d\'une plateforme de vente de produits agricoles locaux',
    amount: '2.500.000 BIF',
    progress: 85,
    category: 'Commerce',
    image: '/market.jpg',
    location: 'Ngozi',
    expectedReturn: '10%',
    status: 'En cours',
  },
  {
    id: 4,
    title: 'Production de Miel',
    description: 'Installation de ruches modernes pour la production de miel biologique',
    amount: '1.800.000 BIF',
    progress: 25,
    category: 'Agriculture',
    image: '/honey.jpg',
    location: 'Muyinga',
    expectedReturn: '18%',
    status: 'Nouveau',
  }
]

const categories = ['Tous', 'Agriculture', 'Élevage', 'Commerce']
const locations = ['Tous', 'Bujumbura', 'Gitega', 'Ngozi', 'Muyinga']
const statuses = ['Tous', 'Nouveau', 'En cours', 'Complété']

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [selectedLocation, setSelectedLocation] = useState('Tous')
  const [selectedStatus, setSelectedStatus] = useState('Tous')

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === 'Tous' || project.category === selectedCategory
    const matchesLocation = selectedLocation === 'Tous' || project.location === selectedLocation
    const matchesStatus = selectedStatus === 'Tous' || project.status === selectedStatus

    return matchesSearch && matchesCategory && matchesLocation && matchesStatus
  })

  return (
    <div className="space-y-8 p-8">
      {/* En-tête */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Projets d&apos;Investissement</h1>
        <p className="text-muted-foreground">
          Découvrez et investissez dans des projets innovants à travers le pays
        </p>
      </div>

      {/* Stats rapides */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">15</div>
            <p className="text-sm text-muted-foreground">Projets actifs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">85M BIF</div>
            <p className="text-sm text-muted-foreground">Total investi</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">12%</div>
            <p className="text-sm text-muted-foreground">Rendement moyen</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">250+</div>
            <p className="text-sm text-muted-foreground">Investisseurs actifs</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher un projet..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Localisation" />
          </SelectTrigger>
          <SelectContent>
            {locations.map(location => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map(status => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Liste des projets */}
      <ProjectItem display={3} />

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Aucun projet ne correspond à vos critères de recherche.
          </p>
        </div>
      )}
    </div>
  )
}
