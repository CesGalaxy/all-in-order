import { Card } from "@repo/ui/components/card"
import { Check } from "lucide-react"
import type { ReactNode } from "react"

interface SocialFeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  features: string[]
  gradientFrom: string
  gradientTo: string
}

export function SocialFeatureCard({
  icon,
  title,
  description,
  features,
  gradientFrom,
  gradientTo,
}: SocialFeatureCardProps) {
  return (
    <Card className="text-center p-8 border-0 shadow-lg bg-white">
      <div
        className={`w-16 h-16 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-full flex items-center justify-center mx-auto mb-6`}
      >
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="text-left space-y-2 text-sm">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="w-4 h-4 text-green-500 mr-2" />
            {feature}
          </li>
        ))}
      </ul>
    </Card>
  )
}
