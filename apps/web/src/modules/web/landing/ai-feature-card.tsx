import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card"
import { Check } from "lucide-react"
import type { ReactNode } from "react"

interface AIFeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  features: string[]
  gradientFrom: string
  gradientTo: string
}

export function AIFeatureCard({ icon, title, description, features, gradientFrom, gradientTo }: AIFeatureCardProps) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
      <CardHeader>
        <div
          className={`w-12 h-12 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
        >
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm text-gray-600">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
