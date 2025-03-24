import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
  title: string
  description: string
  amount: string
  progress: number
  category: string
  image: string
}

export function ProjectCard({ title, description, amount, progress, category, image }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="relative h-40">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2 left-2">
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-white/90 text-gray-800">
            {category}
          </span>
        </div>
      </div>
      <CardContent className="p-4 space-y-4">
        <div>
          <h3 className="font-semibold truncate">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{description}</p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Objectif</span>
            <span className="font-medium text-primary">{amount}</span>
          </div>
          <div className="space-y-2">
            <Progress value={progress} className="h-1.5" />
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">{progress}% atteint</span>
              <Button variant="outline" size="sm" className="h-8">
                Investir
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
