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
import { Search, Filter, ChevronDown, ChevronUp } from 'lucide-react'
import ProjectItem from '@/components/ProjectItem'

const categories = ['Tous', 'Agriculture', 'Élevage', 'Commerce']
const locations = ['Tous', 'Bujumbura', 'Gitega', 'Ngozi', 'Muyinga']
const statuses = ['Tous', 'Nouveau', 'En cours', 'Complété']

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [selectedLocation, setSelectedLocation] = useState('Tous')
  const [selectedStatus, setSelectedStatus] = useState('Tous')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  return (
    <div className="space-y-8 p-4 md:p-8">
      {/* En-tête */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold md:text-3xl">Projets d&apos;Investissement</h1>
        <p className="text-sm text-muted-foreground md:text-base">
          Découvrez et investissez dans des projets innovants à travers le pays
        </p>
      </div>

      {/* Filtres */}
      <div className="flex flex-col gap-4">
        {/* Barre de recherche principale */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher un projet..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Bouton filtre mobile */}
        <Button
          variant="outline"
          className="flex items-center gap-2 md:hidden"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <Filter className="h-4 w-4" />
          <span>Filtres</span>
          {showMobileFilters ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>

        {/* Filtres avancés */}
        <div
          className={`grid gap-4 ${showMobileFilters ? 'grid' : 'hidden md:grid'}`}
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))'
          }}
        >
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full">
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
            <SelectTrigger className="w-full">
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
            <SelectTrigger className="w-full">
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
      </div>

      <ProjectItem display={3} />
    </div>
  )
}