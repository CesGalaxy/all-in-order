import { Card, CardContent } from "@repo/ui/components/card"
import { Badge } from "@repo/ui/components/badge"
import { ArrowRight, CheckCircle, Clock, RefreshCw } from "lucide-react"

export function NotionSyncSection() {
    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <Badge variant="secondary" className="mb-4 bg-brand-pink/10 text-brand-pink">
                        Synchronization
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Real-Time Sync Across Platforms</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Experience seamless synchronization between All In Order and your Notion workspace
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="space-y-8">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-primary/10 rounded-xl">
                                    <RefreshCw className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Bi-Directional Sync</h3>
                                    <p className="text-gray-600">
                                        Changes made in either platform are instantly reflected in the other, ensuring your data is always
                                        up-to-date.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-brand-pink/10 rounded-xl">
                                    <Clock className="w-6 h-6 text-brand-pink" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-Time Updates</h3>
                                    <p className="text-gray-600">
                                        See changes as they happen with real-time synchronization that keeps your team and tools in perfect
                                        harmony.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-green-100 rounded-xl">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Conflict Resolution</h3>
                                    <p className="text-gray-600">
                                        Smart conflict resolution ensures data integrity when simultaneous changes occur across platforms.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <Card className="border-0 shadow-2xl overflow-hidden bg-gradient-to-br from-primary to-purple-600 text-white">
                            <CardContent className="px-8">
                                <div className="">
                                    <h3 className="text-2xl font-bold mb-6">Sync Process</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                                <span className="text-sm font-bold">1</span>
                                            </div>
                                            <div>
                                                <p className="font-medium">Connect your Notion workspace</p>
                                                <p className="text-white/80 text-sm">Secure OAuth authentication</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-white/60 ml-4" />
                                        <div className="flex items-center space-x-4">
                                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                                <span className="text-sm font-bold">2</span>
                                            </div>
                                            <div>
                                                <p className="font-medium">Select pages and databases</p>
                                                <p className="text-white/80 text-sm">Choose what to sync</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-white/60 ml-4" />
                                        <div className="flex items-center space-x-4">
                                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                                <span className="text-sm font-bold">3</span>
                                            </div>
                                            <div>
                                                <p className="font-medium">Enjoy seamless sync</p>
                                                <p className="text-white/80 text-sm">Real-time updates across platforms</p>
                                            </div>
                                        </div>
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
