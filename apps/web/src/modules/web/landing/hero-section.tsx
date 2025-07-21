import { Button } from "@repo/ui/components/button"
import { Badge } from "@repo/ui/components/badge"
import { ArrowRight, Globe, Smartphone, Sparkles, Users, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 py-20 lg:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-pink/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <Badge
            variant="secondary"
            className="mb-6 bg-gradient-to-r from-primary/10 to-brand-pink/10 text-primary border-primary/20"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered Learning Platform - Now in Beta
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Your Learning with{" "}
            <span className="bg-gradient-to-r from-primary to-brand-pink bg-clip-text text-transparent">
              AI Intelligence
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
            All In Order revolutionizes how you organize, learn, and master course content. Experience personalized
            AI-driven education with interactive tools and collaborative features.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-50 border-2 border-primary px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl hover:shadow-brand-pink/10 transition-all"
            >
              <Globe className="w-5 h-5 mr-2" />
              Launch Web App
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" disabled className="px-8 py-4 text-lg font-semibold bg-transparent">
              <Smartphone className="w-5 h-5 mr-2" />
              Mobile App - Coming Soon
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <Zap className="w-4 h-4 text-brand-pink mr-2" />
              Free Beta Access
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 text-primary mr-2" />
              Join 5,000+ Beta Users
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
