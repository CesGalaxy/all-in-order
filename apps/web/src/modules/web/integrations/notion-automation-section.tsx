import { Card, CardContent } from "@repo/ui/components/card"
import { Badge } from "@repo/ui/components/badge"
import { Button } from "@repo/ui/components/button"
import { Download, LayoutTemplateIcon as Template, Workflow, Zap } from "lucide-react"

export function NotionAutomationSection() {
    const templates = [
        {
            name: "Student Dashboard",
            description: "Complete academic tracking system",
            features: ["Course management", "Assignment tracking", "Grade calculator", "Study schedule"],
            downloads: "2.5k",
        },
        {
            name: "Research Hub",
            description: "Organize research projects and sources",
            features: ["Source management", "Note organization", "Citation tracking", "Progress monitoring"],
            downloads: "1.8k",
        },
        {
            name: "Learning Journal",
            description: "Daily learning and reflection tracker",
            features: ["Daily entries", "Progress tracking", "Goal setting", "Reflection prompts"],
            downloads: "3.2k",
        },
    ]

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
                        Automation & Templates
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Automate Your Notion Workspace</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Save time with pre-built templates and intelligent automation workflows designed for learners
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    <div>
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-primary/10 rounded-xl">
                                    <Template className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Templates</h3>
                                    <p className="text-gray-600">
                                        Pre-designed Notion templates optimized for learning, with built-in AI integration points and
                                        automation triggers.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-brand-pink/10 rounded-xl">
                                    <Workflow className="w-6 h-6 text-brand-pink" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Automated Workflows</h3>
                                    <p className="text-gray-600">
                                        Set up intelligent workflows that automatically organize content, update properties, and trigger AI
                                        analysis.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-purple-100 rounded-xl">
                                    <Zap className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Setup</h3>
                                    <p className="text-gray-600">
                                        Our AI analyzes your learning goals and automatically configures your Notion workspace for optimal
                                        productivity.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <Card className="border-0 shadow-2xl">
                            <CardContent className="p-8">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold">Automation Rules</h3>
                                        <Badge className="bg-green-100 text-green-700">Active</Badge>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-medium text-sm">Auto-categorize notes</span>
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            </div>
                                            <p className="text-xs text-gray-600">When: New note created → AI categorizes by subject</p>
                                        </div>

                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-medium text-sm">Generate study reminders</span>
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            </div>
                                            <p className="text-xs text-gray-600">When: Deadline approaching → Create calendar event</p>
                                        </div>

                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-medium text-sm">Update progress tracking</span>
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            </div>
                                            <p className="text-xs text-gray-600">When: Task completed → Update progress dashboard</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {templates.map((template, index) => (
                        <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">{template.name}</h3>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Download className="w-4 h-4 mr-1" />
                                        {template.downloads}
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-4">{template.description}</p>
                                <ul className="space-y-1 mb-6">
                                    {template.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-sm text-gray-500">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Button className="w-full bg-primary hover:bg-primary/90">Use Template</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
