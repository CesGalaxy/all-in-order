import { Card, CardContent } from "@repo/ui/components/card"
import { Badge } from "@repo/ui/components/badge"
import { BookOpen, CheckCircle, FolderOpen, Target } from "lucide-react"

export function OrganizationSection() {
  return (
    <section id="organization" className="py-20 bg-gradient-to-br from-gray-50 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-brand-pink/10 text-brand-pink">
            Course Organization
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Structure Your Learning Journey</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform chaotic study materials into organized, accessible knowledge with our intelligent organization
            system
          </p>
        </div>

        {/* Breaking the Grid - Offset Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="lg:order-2">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <FolderOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Course Structure</h3>
                  <p className="text-gray-600">
                    Automatically organize lessons and topics into logical hierarchies that make sense for your learning
                    style.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-brand-pink/10 rounded-xl">
                  <BookOpen className="w-6 h-6 text-brand-pink" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Topic Categorization</h3>
                  <p className="text-gray-600">
                    AI-powered categorization ensures related concepts are grouped together for better understanding.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Progress Tracking</h3>
                  <p className="text-gray-600">
                    Visual progress indicators help you stay motivated and see how far you&#39;ve come.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:order-1">
            <Card className="border-0 shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span className="font-medium">Mathematics</span>
                    </div>
                    <Badge className="bg-primary text-white">85%</Badge>
                  </div>

                  <div className="ml-8 space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Calculus Fundamentals</span>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Integration Techniques</span>
                      <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-brand-pink/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 border-2 border-brand-pink rounded-full"></div>
                      <span className="font-medium">Physics</span>
                    </div>
                    <Badge variant="outline" className="border-brand-pink text-brand-pink">
                      45%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
