'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar as CalendarIcon, Download, Search, Filter } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

// Données de test pour l'historique
const historicalData = [
  {
    id: 1,
    type: 'investment',
    category: 'project',
    name: 'Ferme Agricole Moderne',
    amount: 500000,
    date: '2025-03-15',
    status: 'success',
    description: 'Investissement initial',
  },
  {
    id: 2,
    type: 'return',
    category: 'project',
    name: 'Ferme Agricole Moderne',
    amount: 25000,
    date: '2025-03-01',
    status: 'success',
    description: 'Retour mensuel',
  },
  {
    id: 3,
    type: 'investment',
    category: 'credit',
    name: 'Crédit Agriculture',
    amount: 300000,
    date: '2025-02-15',
    status: 'success',
    description: 'Nouveau crédit',
  },
  {
    id: 4,
    type: 'payment',
    category: 'credit',
    name: 'Crédit Agriculture',
    amount: 15000,
    date: '2025-03-15',
    status: 'pending',
    description: 'Paiement mensuel',
  },
  {
    id: 5,
    type: 'withdrawal',
    category: 'project',
    name: 'Commerce de Produits Locaux',
    amount: 45000,
    date: '2025-03-10',
    status: 'success',
    description: 'Retrait des bénéfices',
  }
]

const types = ['Tous', 'Investissement', 'Retour', 'Paiement', 'Retrait']
const categories = ['Tous', 'Projet', 'Crédit']
const statuses = ['Tous', 'Réussi', 'En attente']

export default function HistoriquePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('Tous')
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [selectedStatus, setSelectedStatus] = useState('Tous')
  const [date, setDate] = useState<Date>()

  // Calcul des totaux
  const totalInvested = historicalData
    .filter(item => item.type === 'investment')
    .reduce((sum, item) => sum + item.amount, 0)
  
  const totalReturns = historicalData
    .filter(item => item.type === 'return')
    .reduce((sum, item) => sum + item.amount, 0)
  
  const totalPayments = historicalData
    .filter(item => item.type === 'payment')
    .reduce((sum, item) => sum + item.amount, 0)

  const filteredHistory = historicalData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = selectedType === 'Tous' || 
                       (selectedType === 'Investissement' && item.type === 'investment') ||
                       (selectedType === 'Retour' && item.type === 'return') ||
                       (selectedType === 'Paiement' && item.type === 'payment') ||
                       (selectedType === 'Retrait' && item.type === 'withdrawal')
    
    const matchesCategory = selectedCategory === 'Tous' || 
                          (selectedCategory === 'Projet' && item.category === 'project') ||
                          (selectedCategory === 'Crédit' && item.category === 'credit')
    
    const matchesStatus = selectedStatus === 'Tous' || 
                         (selectedStatus === 'Réussi' && item.status === 'success') ||
                         (selectedStatus === 'En attente' && item.status === 'pending')
    
    const matchesDate = !date || item.date === format(date, 'yyyy-MM-dd')

    return matchesSearch && matchesType && matchesCategory && matchesStatus && matchesDate
  })

  return (
    <div className="flex-1 h-full bg-background w-full">
      <div className="h-full p-8 pt-6 space-y-8 overflow-auto">
        {/* En-tête */}
        <div className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Historique des Transactions</h1>
              <p className="text-muted-foreground mt-2">
                Consultez l&apos;historique de vos investissements, crédits et paiements
              </p>
            </div>
            <Button className="hidden sm:flex gap-2" variant="outline">
              <Download className="h-4 w-4" />
              Exporter
            </Button>
          </div>
        </div>

        {/* Stats rapides */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-muted-foreground">Total Investi</p>
                <div className="text-2xl font-bold text-primary">{totalInvested.toLocaleString()} BIF</div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-muted-foreground">Total des Retours</p>
                <div className="text-2xl font-bold text-green-600">{totalReturns.toLocaleString()} BIF</div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-muted-foreground">Total des Paiements</p>
                <div className="text-2xl font-bold text-blue-600">{totalPayments.toLocaleString()} BIF</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher une transaction..."
              className="pl-9 bg-transparent border-gray-200 dark:border-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {types.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP', { locale: fr }) : 'Date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Liste des transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredHistory.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.name}</span>
                      <span className={cn(
                        'px-2 py-1 rounded-full text-xs font-medium',
                        item.category === 'project' 
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                          : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      )}>
                        {item.category === 'project' ? 'Projet' : 'Crédit'}
                      </span>
                      <span className={cn(
                        'px-2 py-1 rounded-full text-xs font-medium',
                        item.status === 'success'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                      )}>
                        {item.status === 'success' ? 'Réussi' : 'En attente'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={cn(
                      'font-medium',
                      item.type === 'investment' || item.type === 'payment'
                        ? 'text-red-600'
                        : 'text-green-600'
                    )}>
                      {item.type === 'investment' || item.type === 'payment' ? '-' : '+'}
                      {item.amount.toLocaleString()} BIF
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(item.date), 'PPP', { locale: fr })}
                    </span>
                  </div>
                </div>
              ))}

              {filteredHistory.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Aucune transaction ne correspond à vos critères de recherche.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
