'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, Filter, Download, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
// import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState, useCallback } from 'react'
import useFeaturesStore from '@/stores/features'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useMediaQuery } from '@/hooks/use-media-query'

type Transaction = {
  id: string
  type: 'deposit' | 'withdrawal' | 'investment' | 'dividend'
  amount: number
  status: 'completed' | 'pending' | 'failed'
  date: string
  reference: string
  description?: string
}

type TransactionStats = {
  total: number
  completed: number
  pending: number
  failed: number
  totalAmount: number
  depositAmount: number
  withdrawalAmount: number
}

export default function TransactionsPage() {
  // const { toast } = useToast()
  const { loadTransactions, transactions } = useFeaturesStore()
  const isMobile = useMediaQuery('(max-width: 768px)')
  
  const [isLoading, setIsLoading] = useState(true)
  const [isExporting, setIsExporting] = useState(false)
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = isMobile ? 5 : 10

  // Memoized function to calculate stats
  const calculateStats = useCallback((transactions: Transaction[]): TransactionStats => {
    return {
      total: transactions.length,
      completed: transactions.filter(t => t.status === 'completed').length,
      pending: transactions.filter(t => t.status === 'pending').length,
      failed: transactions.filter(t => t.status === 'failed').length,
      totalAmount: transactions.reduce((sum, t) => sum + t.amount, 0),
      depositAmount: transactions
        .filter(t => t.type === 'deposit')
        .reduce((sum, t) => sum + t.amount, 0),
      withdrawalAmount: transactions
        .filter(t => t.type === 'withdrawal')
        .reduce((sum, t) => sum + t.amount, 0),
    }
  }, [])

  const [stats, setStats] = useState<TransactionStats>({
    total: 0,
    completed: 0,
    pending: 0,
    failed: 0,
    totalAmount: 0,
    depositAmount: 0,
    withdrawalAmount: 0
  })

  // Load transactions
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        await loadTransactions()
      } catch (error) {
        // toast({
        //   variant: "destructive",
        //   title: "Erreur",
        //   description: "Impossible de charger les transactions",
        // })
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [loadTransactions])

  // Filter transactions and calculate stats
  useEffect(() => {
    let result = transactions || []
    
    if (typeFilter !== 'all') {
      result = result.filter(t => t.type === typeFilter)
    }
    
    if (statusFilter !== 'all') {
      result = result.filter(t => t.status === statusFilter)
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(t => 
        t.reference.toLowerCase().includes(query) || 
        (t.motif && t.motif.toLowerCase().includes(query))
      )
    }
    
    setFilteredTransactions(result)
    setStats(calculateStats(result))
    setCurrentPage(1)
  }, [transactions, typeFilter, statusFilter, searchQuery, calculateStats])

  // Pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Complété</Badge>
      case 'pending':
        return <Badge variant="warning">En attente</Badge>
      case 'failed':
        return <Badge variant="destructive">Échoué</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Type badge component
  const TypeBadge = ({ type }: { type: string }) => {
    switch (type) {
      case 'deposit':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Dépôt</Badge>
      case 'withdrawal':
        return <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">Retrait</Badge>
      case 'investment':
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Investissement</Badge>
      case 'dividend':
        return <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">Dividende</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'BIF',
      minimumFractionDigits: 0
    }).format(amount)
  }

  // Handle export
  const handleExport = async () => {
    try {
      setIsExporting(true)
      // Simulate export delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast({
        title: "Export réussi",
        description: "Vos transactions ont été exportées",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Échec de l'export des transactions",
      })
    } finally {
      setIsExporting(false)
    }
  }

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const buttons = []
    const maxVisibleButtons = isMobile ? 3 : 5

    if (totalPages <= maxVisibleButtons) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <Button
            key={i}
            variant={currentPage === i ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </Button>
        )
      }
    } else {
      // Show first page
      buttons.push(
        <Button
          key={1}
          variant={currentPage === 1 ? "default" : "outline"}
          size="sm"
          onClick={() => setCurrentPage(1)}
        >
          1
        </Button>
      )

      // Show ellipsis or more pages
      if (currentPage > maxVisibleButtons - 1) {
        buttons.push(
          <span key="left-ellipsis" className="px-2 flex items-center">...</span>
        )
      }

      // Show middle pages
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        if (i > 1 && i < totalPages) {
          buttons.push(
            <Button
              key={i}
              variant={currentPage === i ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(i)}
            >
              {i}
            </Button>
          )
        }
      }

      // Show right ellipsis or more pages
      if (currentPage < totalPages - (maxVisibleButtons - 2)) {
        buttons.push(
          <span key="right-ellipsis" className="px-2 flex items-center">...</span>
        )
      }

      // Show last page
      buttons.push(
        <Button
          key={totalPages}
          variant={currentPage === totalPages ? "default" : "outline"}
          size="sm"
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </Button>
      )
    }

    return buttons
  }

  return (
    <div className="container mx-auto py-4 md:py-8">
      <div className="flex flex-col gap-4 md:gap-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">Historique des transactions</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Consultez l'historique complet de vos transactions financières
            </p>
          </div>
          <Button 
            variant="outline" 
            className="gap-2 w-full md:w-auto"
            onClick={handleExport}
            disabled={isExporting || filteredTransactions.length === 0}
          >
            {isExporting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            Exporter
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          <Card className="hover:shadow-sm transition-shadow">
            <CardHeader className="pb-2 px-4 md:px-6">
              <CardTitle className="text-xs md:text-sm font-medium">Total</CardTitle>
            </CardHeader>
            <CardContent className="px-4 md:px-6 pb-4">
              <div className="text-lg md:text-2xl font-bold">{stats.total}</div>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">Transactions</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-sm transition-shadow">
            <CardHeader className="pb-2 px-4 md:px-6">
              <CardTitle className="text-xs md:text-sm font-medium">Complétées</CardTitle>
            </CardHeader>
            <CardContent className="px-4 md:px-6 pb-4">
              <div className="text-lg md:text-2xl font-bold">{stats.completed}</div>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                {stats.total > 0 ? `${Math.round((stats.completed / stats.total) * 100)}%` : '0%'}
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-sm transition-shadow">
            <CardHeader className="pb-2 px-4 md:px-6">
              <CardTitle className="text-xs md:text-sm font-medium">Montant</CardTitle>
            </CardHeader>
            <CardContent className="px-4 md:px-6 pb-4">
              <div className="text-lg md:text-2xl font-bold">{formatCurrency(stats.totalAmount)}</div>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">Total</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-sm transition-shadow">
            <CardHeader className="pb-2 px-4 md:px-6">
              <CardTitle className="text-xs md:text-sm font-medium">Solde</CardTitle>
            </CardHeader>
            <CardContent className="px-4 md:px-6 pb-4">
              <div className="text-lg md:text-2xl font-bold">
                {formatCurrency(stats.depositAmount - stats.withdrawalAmount)}
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">Net</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="hover:shadow-sm transition-shadow">
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="relative col-span-1 md:col-span-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="col-span-1">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Type" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="deposit">Dépôts</SelectItem>
                  <SelectItem value="withdrawal">Retraits</SelectItem>
                  <SelectItem value="investment">Investissements</SelectItem>
                  <SelectItem value="dividend">Dividendes</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="col-span-1">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Statut" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="completed">Complété</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="failed">Échoué</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                className="col-span-1 gap-2"
                onClick={() => {
                  setSearchQuery('')
                  setTypeFilter('all')
                  setStatusFilter('all')
                }}
                disabled={searchQuery === '' && typeFilter === 'all' && statusFilter === 'all'}
              >
                Réinitialiser
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card className="hover:shadow-sm transition-shadow">
          <CardHeader className="p-4 md:p-6 pb-0 md:pb-0">
            <CardTitle className="text-lg md:text-xl">Liste des transactions</CardTitle>
          </CardHeader>
          <CardContent className="p-0 md:p-0">
            {isLoading ? (
              <div className="space-y-3 p-4 md:p-6">
                {[...Array(itemsPerPage)].map((_, i) => (
                  <Skeleton key={i} className="h-12 md:h-16 w-full" />
                ))}
              </div>
            ) : filteredTransactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 md:py-12 text-center p-4 md:p-6">
                <Search className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground mb-4" />
                <h3 className="text-base md:text-lg font-medium">Aucune transaction trouvée</h3>
                <p className="text-sm md:text-base text-muted-foreground mt-2">
                  {searchQuery || typeFilter !== 'all' || statusFilter !== 'all' 
                    ? "Aucune transaction ne correspond à vos critères de recherche" 
                    : "Aucune transaction disponible"}
                </p>
                {(searchQuery || typeFilter !== 'all' || statusFilter !== 'all') && (
                  <Button 
                    variant="ghost" 
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery('')
                      setTypeFilter('all')
                      setStatusFilter('all')
                    }}
                  >
                    Réinitialiser les filtres
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table className="min-w-[600px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px]">Référence</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Montant</TableHead>
                        <TableHead>Statut</TableHead>
                        {!isMobile && <TableHead className="text-right">Description</TableHead>}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedTransactions.map((transaction) => (
                        <TableRow key={transaction.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium py-3">
                            <span className="line-clamp-1">{transaction.reference}</span>
                          </TableCell>
                          <TableCell className="py-3">
                            <TypeBadge type={transaction.type} />
                          </TableCell>
                          <TableCell className="py-3">
                            <div className="flex flex-col">
                              <span className="text-sm">
                                {format(new Date(transaction.date), 'dd MMM yyyy', { locale: fr })}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {format(new Date(transaction.date), 'HH:mm', { locale: fr })}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className={`text-right py-3 font-medium ${
                            transaction.type === 'withdrawal' ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {transaction ? '-' : '+'}{formatCurrency(transaction.amount)}
                          </TableCell>
                          <TableCell className="py-3">
                            <StatusBadge status={transaction.status} />
                          </TableCell>
                          {!isMobile && (
                            <TableCell className="text-right py-3">
                              <span className="line-clamp-1">
                                {transaction.motif?.slice(0, 20)+ "..." || '—'}
                              </span>
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-4 md:px-6 py-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      Affichage de {(currentPage - 1) * itemsPerPage + 1} à{' '}
                      {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} sur{' '}
                      {filteredTransactions.length} transactions
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      {renderPaginationButtons()}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}