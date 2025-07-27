import { Card, CardContent } from "@repo/ui/components/card"
import { Badge } from "@repo/ui/components/badge"
import { BarChart3, Brain, Lightbulb, MessageSquare, Target, TrendingUp } from "lucide-react"

export function NotionAISection() {
    const aiFeatures = [
        {
            icon: <Brain className="w-6 h-6" />,
            title: "Content Analysis",
            description: "AI analyzes your Notion content to identify learning patterns and knowledge gaps.",
            example: "Analyzed 47 pages and found you excel in calculus but need more practice with statistics.",
        },
        {
            icon: <MessageSquare className="w-6 h-6" />,
            title: "Smart Q&A",
            description: "Ask questions about your notes and get intelligent answers based on your content.",
            example: "Q: 'What did I learn about photosynthesis?' A: Based on your notes from Biology 101...",
        },
        {
            icon: <BarChart3 className="w-6 h-6" />,
            title: "Progress Insights",
            description: "Get detailed analytics on your learning progress across different subjects.",
            example: "You've completed 78% of your Math goals and are ahead of schedule by 2 weeks.",
        },
        {
            icon: <Lightbulb className="w-6 h-6" />,
            title: "Study Suggestions",
            description: "Receive personalized study recommendations based on your learning history.",
            example: "Based on your recent physics notes, try reviewing wave mechanics next.",
        },
        {
            icon: <Target className="w-6 h-6" />,
            title: "Goal Tracking",
            description: "AI monitors your progress toward learning goals and suggests adjustments.",
            example: "You're 85% toward your semester goal. Consider focusing on weak areas.",
        },
        {
            icon: <TrendingUp className="w-6 h-6" />,
            title: "Performance Trends",
            description: "Identify trends in your learning performance and optimize your study schedule.",
            example: "Your retention is 23% higher when studying in the morning vs. evening.",
        },
    ]

    return (
        <section className="py-20 bg-gradient-to-br from-purple-50/30 to-pink-50/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <Badge variant="secondary" className="mb-4 bg-brand-pink/10 text-brand-pink">
                        AI-Powered Features
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                        Intelligent Insights from Your Notion Content
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Transform your static notes into dynamic learning insights with AI that understands your content
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {aiFeatures.map((feature, index) => (
                        <Card
                            key={index}
                            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                        >
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <div className="text-primary">{feature.icon}</div>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                                </div>
                                <p className="text-gray-600 mb-4">{feature.description}</p>
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-sm text-gray-700">
                                        <span className="font-medium text-primary">Example:</span> {feature.example}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-16">
                    <Card className="border-0 shadow-2xl overflow-hidden bg-gradient-to-r from-primary to-brand-pink text-white">
                        <CardContent className="px-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                <div>
                                    <h3 className="text-2xl font-bold mb-4">AI Learning Assistant</h3>
                                    <p className="text-white/90 mb-6">
                                        Your personal AI tutor that learns from your Notion content and provides personalized guidance to
                                        accelerate your learning journey.
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                                            <span className="text-white/90">Analyzes 100+ pages per minute</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                                            <span className="text-white/90">Provides contextual recommendations</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                                            <span className="text-white/90">Learns from your study patterns</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                                <Brain className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-white/90">
                                                    &#34;I noticed you&#39;ve been studying quantum physics. Based on your notes, you might want to
                                                    review wave-particle duality before moving to quantum entanglement.&#34;
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-white/60">
                                            <span>AI Learning Assistant</span>
                                            <span>Just now</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
