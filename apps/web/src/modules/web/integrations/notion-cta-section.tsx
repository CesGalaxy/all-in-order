import { Button } from "@repo/ui/components/button"
import { Card, CardContent } from "@repo/ui/components/card"
import { ArrowRight, CheckCircle, Zap } from "lucide-react"

export function NotionCTASection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Card className="border-0 shadow-2xl overflow-hidden bg-gradient-to-br from-primary to-brand-pink text-white text-center">
                    <CardContent className="px-12 py-4">
                            <div className="max-w-2xl mx-auto">
                                <div className="flex justify-center mb-6">
                                    <div className="p-4 bg-white/20 rounded-full">
                                        <Zap className="w-8 h-8" />
                                    </div>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Supercharge Your Notion Workspace?</h2>
                                <p className="text-xl text-white/90 mb-8">
                                    Join thousands of learners who have transformed their Notion experience with AI-powered insights and
                                    automation.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                                    <Button
                                        size="lg"
                                        className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                                    >
                                        Connect Notion Now
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold bg-transparent"
                                    >
                                        Watch Demo
                                    </Button>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-white/80">
                                    <div className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Free 14-day trial
                                    </div>
                                    <div className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        No credit card required
                                    </div>
                                    <div className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Setup in 2 minutes
                                    </div>
                                </div>
                            </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
