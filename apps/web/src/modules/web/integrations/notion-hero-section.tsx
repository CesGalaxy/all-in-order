import { Button } from "@repo/ui/components/button"
import { Badge } from "@repo/ui/components/badge"
import { ArrowRight, CheckCircle, Users, Zap } from "lucide-react"

export function NotionHeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-purple-50/30 py-20 lg:py-32">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float"></div>
                <div
                    className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-pink/5 rounded-full blur-3xl animate-float"
                    style={{ animationDelay: "1s" }}
                ></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Badge
                            variant="secondary"
                            className="mb-6 bg-gradient-to-r from-primary/10 to-brand-pink/10 text-primary border-primary/20"
                        >
                            <Zap className="w-3 h-3 mr-1" />
                            Notion Integration
                        </Badge>

                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Supercharge Your{" "}
                            <span className="bg-gradient-to-r from-primary to-brand-pink bg-clip-text text-transparent">
                Notion Workspace
              </span>
                        </h1>

                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Transform your Notion workspace into an AI-powered learning hub. Seamlessly sync, organize, and enhance
                            your notes with intelligent automation and personalized insights.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <Button
                                size="lg"
                                className="bg-white text-primary hover:bg-gray-50 border-2 border-primary px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                            >
                                Connect Notion
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                            <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold bg-transparent">
                                View Demo
                            </Button>
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <div className="flex items-center">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                Real-time sync
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                AI-powered insights
                            </div>
                            <div className="flex items-center">
                                <Users className="w-4 h-4 text-primary mr-2" />
                                10,000+ users connected
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
                                        <span className="text-white text-sm font-bold">N</span>
                                    </div>
                                    <span className="font-semibold text-lg">My Learning Workspace</span>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                                        <span className="font-medium">📚 Course Notes</span>
                                        <Badge className="bg-primary text-white text-xs">Synced</Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-brand-pink/5 rounded-lg">
                                        <span className="font-medium">🎯 Study Goals</span>
                                        <Badge className="bg-brand-pink text-white text-xs">AI Enhanced</Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                        <span className="font-medium">📅 Study Schedule</span>
                                        <Badge className="bg-green-500 text-white text-xs">Auto-sync</Badge>
                                    </div>
                                </div>

                                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                                        <span className="text-sm text-gray-600">AI is analyzing your notes...</span>
                                    </div>
                                    <div className="bg-white rounded p-3 text-sm">
                                        <span className="text-primary font-medium">💡 Insight:</span> You&#39;ve mastered calculus
                                        fundamentals! Ready for advanced topics?
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
