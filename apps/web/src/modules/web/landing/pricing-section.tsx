import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card"
import { Badge } from "@repo/ui/components/badge"
import { Button } from "@repo/ui/components/button"
import { ArrowRight, Check } from "lucide-react"

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
            Beta Pricing
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Start Free, Upgrade When Ready</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the full power of AI-driven learning with our beta pricing
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="border-2 border-gray-200 p-6">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold">Free Beta</CardTitle>
              <div className="text-4xl font-bold text-gray-900 mt-4">
                $0<span className="text-lg text-gray-500">/month</span>
              </div>
              <p className="text-gray-600 mt-4">Perfect for getting started</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-8">
                {["Basic AI features", "5 courses", "Community access", "1GB storage"].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-transparent" variant="outline">
                Get Started Free
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-brand-pink p-6 relative">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-pink text-white">
              Most Popular
            </Badge>
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold">Plus Plan</CardTitle>
              <div className="text-4xl font-bold text-gray-900 mt-4">
                $5<span className="text-lg text-gray-500">/month</span>
              </div>
              <p className="text-gray-600 mt-4">Full AI-powered experience</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-8">
                {[
                  "Unlimited AI features",
                  "Unlimited courses",
                  "Priority support",
                  "100GB storage",
                  "Advanced analytics",
                ].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-brand-pink hover:bg-brand-pink/90">Upgrade to Plus</Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
          >
            View Detailed Pricing
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
