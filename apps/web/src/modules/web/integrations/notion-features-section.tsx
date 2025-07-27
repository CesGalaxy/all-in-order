import { Card, CardContent } from "@repo/ui/components/card"
import { Badge } from "@repo/ui/components/badge"
import { Brain, Calendar, Database, FolderOpen, FolderSyncIcon as Sync, Settings } from "lucide-react"

export function NotionFeaturesSection() {
    const features = [
        {
            icon: <Sync className="w-8 h-8" />,
            title: "Note Synchronization",
            description: "Seamlessly sync your notes between Notion and All In Order in real-time.",
            details: ["Bi-directional sync", "Instant updates", "Conflict resolution", "Offline support"],
            color: "bg-primary/10 text-primary",
        },
        {
            icon: <FolderOpen className="w-8 h-8" />,
            title: "Content Organization",
            description: "Intelligent organization tools that structure your learning materials automatically.",
            details: ["Smart categorization", "Tag management", "Hierarchical structure", "Search optimization"],
            color: "bg-brand-pink/10 text-brand-pink",
        },
        {
            icon: <Settings className="w-8 h-8" />,
            title: "Workspace Automation",
            description: "Automate your Notion workspace with templates and intelligent workflows.",
            details: ["Custom templates", "Automated workflows", "Smart properties", "Bulk operations"],
            color: "bg-purple-100 text-purple-700",
        },
        {
            icon: <Calendar className="w-8 h-8" />,
            title: "Calendar Integration",
            description: "Sync your study schedule and deadlines with Notion's calendar system.",
            details: ["Event synchronization", "Deadline tracking", "Schedule optimization", "Reminder automation"],
            color: "bg-blue-100 text-blue-700",
        },
        {
            icon: <Database className="w-8 h-8" />,
            title: "Database Sync",
            description: "Connect and synchronize with your Notion databases for comprehensive data management.",
            details: ["Multi-database sync", "Custom properties", "Relation mapping", "Formula support"],
            color: "bg-green-100 text-green-700",
        },
        {
            icon: <Brain className="w-8 h-8" />,
            title: "AI Content Analysis",
            description: "Leverage AI to analyze and enhance your Notion content with intelligent insights.",
            details: ["Content analysis", "Learning insights", "Progress tracking", "Personalized recommendations"],
            color: "bg-orange-100 text-orange-700",
        },
    ]

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
                        Integration Features
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                        Everything You Need for Notion Integration
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover how All In Order transforms your Notion workspace into a powerful learning environment
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                        >
                            <CardContent className="p-8">
                                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-600 mb-6">{feature.description}</p>
                                <ul className="space-y-2">
                                    {feature.details.map((detail, idx) => (
                                        <li key={idx} className="flex items-center text-sm text-gray-500">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
