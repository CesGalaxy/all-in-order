"use client"

import { useMemo, useState } from "react"
import { Card, CardContent } from "@repo/ui/components/card"
import { Badge } from "@repo/ui/components/badge"
import { BarChart3, Brain, Lightbulb, MessageSquare } from "lucide-react"

const features = [
    {
        id: "quizzes",
        title: "AI-Generated Quizzes",
        icon: <Brain className="w-6 h-6"/>,
        description: "Create intelligent quizzes that adapt to your learning progress and identify knowledge gaps.",
        details:
            "Our AI analyzes your learning patterns to generate personalized questions that challenge you at the right level.",
        color: "from-primary to-purple-600",
    },
    {
        id: "explanations",
        title: "AI-Driven Explanations",
        icon: <MessageSquare className="w-6 h-6"/>,
        description: "Get instant, detailed explanations for any topic with conversational AI assistance.",
        details:
            "Ask questions in natural language and receive comprehensive explanations tailored to your understanding level.",
        color: "from-brand-pink to-pink-600",
    },
    {
        id: "reports",
        title: "Learning Reports",
        icon: <BarChart3 className="w-6 h-6"/>,
        description: "Receive AI-generated reports with actionable insights and improvement recommendations.",
        details: "Track your progress with detailed analytics and get personalized suggestions for areas to focus on.",
        color: "from-purple-500 to-primary",
    },
    {
        id: "feynman",
        title: "Feynman Method AI",
        icon: <Lightbulb className="w-6 h-6"/>,
        description: "Master concepts through AI-guided Feynman technique for deeper understanding.",
        details: "Practice explaining complex topics in simple terms with AI feedback to ensure true comprehension.",
        color: "from-pink-500 to-brand-pink",
    },
]

export function AIFeaturesSection() {
    const [activeTab, setActiveTab] = useState(0);

    const activeFeature = useMemo(() => features[activeTab], [activeTab])!;

    return (
        <section id="features" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
                        AI-Powered Features
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Intelligent Learning at Your
                        Fingertips</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover how artificial intelligence transforms your learning experience with personalized tools
                        and
                        insights
                    </p>
                </div>

                {/* Breaking the Grid - Asymmetric Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Tab Navigation - Takes 1 column */}
                    <div className="lg:col-span-1">
                        <div className="space-y-4 sticky top-24">
                            {features.map((feature, index) => (
                                <button
                                    key={feature.id}
                                    onClick={() => setActiveTab(index)}
                                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                                        activeTab === index
                                            ? `bg-gradient-to-r ${feature.color} text-white shadow-lg transform scale-105`
                                            : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                                    }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className={`p-2 rounded-lg ${activeTab === index ? "bg-white/20" : "bg-white"}`}>
                                            <div
                                                className={activeTab === index ? "text-white" : "text-gray-600"}>{feature.icon}</div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">{feature.title}</h3>
                                            <p className={`text-sm ${activeTab === index ? "text-white/80" : "text-gray-500"}`}>
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Area - Takes 2 columns */}
                    <Card
                        className={`lg:col-span-2 border-0 shadow-2xl overflow-hidden bg-gradient-to-br ${activeFeature.color} text-white p-0`}>
                        <CardContent className="p-8">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="p-3 bg-white/20 rounded-xl">{activeFeature.icon}</div>
                                <h3 className="text-2xl font-bold">{activeFeature.title}</h3>
                            </div>
                            <p className="text-lg text-white/90 mb-6">{activeFeature.details}</p>

                            {/* Visual Representation */}
                            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                                <div className="grid grid-cols-3 gap-4">
                                    {[1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className="bg-white/20 rounded-lg h-16 animate-pulse"
                                            style={{ animationDelay: `${i * 0.2}s` }}
                                        ></div>
                                    ))}
                                </div>
                                <div className="mt-4 space-y-2">
                                    <div className="bg-white/20 rounded h-2 w-full"></div>
                                    <div className="bg-white/20 rounded h-2 w-3/4"></div>
                                    <div className="bg-white/20 rounded h-2 w-1/2"></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
