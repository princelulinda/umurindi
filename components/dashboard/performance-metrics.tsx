import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const metrics = [
  {
    title: "Objectif Mensuel",
    current: 850000,
    target: 1000000,
    percentage: 85,
    status: "En bonne voie",
    trend: "positive",
  },
  {
    title: "Rendement Moyen",
    value: "12.5%",
    subtext: "+2.3% par rapport au mois dernier",
    trend: "positive",
  },
  {
    title: "Projets Complétés",
    value: "8/10",
    subtext: "2 projets en cours",
    trend: "neutral",
  }
]

export function PerformanceMetrics() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Métriques de Performance</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.title} className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </p>
              {'percentage' in metric ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">
                      {metric.current.toLocaleString()} BIF
                    </span>
                    <span className="text-muted-foreground">
                      Objectif: {metric.target.toLocaleString()} BIF
                    </span>
                  </div>
                  <Progress value={metric.percentage} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {metric.status} ({metric.percentage}%)
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className={`text-sm ${
                    metric.trend === 'positive' 
                      ? 'text-green-600'
                      : metric.trend === 'negative'
                      ? 'text-red-600'
                      : 'text-muted-foreground'
                  }`}>
                    {metric.subtext}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
