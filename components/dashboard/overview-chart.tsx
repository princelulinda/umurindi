'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const data = [
  { month: 'Jan', montant: 1200000 },
  { month: 'Fév', montant: 1800000 },
  { month: 'Mar', montant: 2200000 },
  { month: 'Avr', montant: 2800000 },
  { month: 'Mai', montant: 3300000 },
  { month: 'Juin', montant: 3800000 },
]

const formatMontant = (value: number) => {
  return `${(value / 1000000).toFixed(1)}M BIF`
}

export function OverviewChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aperçu Financier</CardTitle>
        <CardDescription>Vue d&apos;ensemble de vos investissements</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="6m" className="space-y-4">
          <TabsList>
            <TabsTrigger value="1m">30 jours</TabsTrigger>
            <TabsTrigger value="3m">3 mois</TabsTrigger>
            <TabsTrigger value="6m">6 mois</TabsTrigger>
          </TabsList>
          <TabsContent value="6m" className="space-y-4">
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorMontant" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="month" 
                    className="text-xs" 
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis 
                    tickFormatter={formatMontant}
                    className="text-xs"
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <Tooltip 
                    formatter={(value: number) => [`${value.toLocaleString()} BIF`, 'Montant']}
                    labelClassName="text-muted-foreground"
                  />
                  <Area
                    type="monotone"
                    dataKey="montant"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorMontant)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
