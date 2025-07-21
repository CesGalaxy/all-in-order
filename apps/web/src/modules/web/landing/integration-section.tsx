import { Card, CardContent } from "@repo/ui/components/card"
import { Badge } from "@repo/ui/components/badge"
import { Calculator, FileText, PenTool, Puzzle } from "lucide-react"

export function IntegrationSection() {
  const tools = [
    {
      icon: <Puzzle className="w-8 h-8" />,
      title: "Notion Sync",
      description: "Seamlessly sync with your Notion workspace",
      color: "bg-gray-100 text-gray-700",
    },
    {
      icon: <PenTool className="w-8 h-8" />,
      title: "Digital Canvas",
      description: "Visual learning with interactive canvas",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "LaTeX Support",
      description: "Mathematical equations made easy",
      color: "bg-brand-pink/10 text-brand-pink",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Smart Notebooks",
      description: "Organized note-taking with AI assistance",
      color: "bg-green-100 text-green-700",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
            Integrations & Tools
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Your Favorite Tools, Enhanced</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Integrate with the tools you already love and discover new ways to enhance your learning experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 ${tool.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  {tool.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h3>
                <p className="text-gray-600 text-sm">{tool.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
