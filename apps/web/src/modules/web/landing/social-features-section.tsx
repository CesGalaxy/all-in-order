import { Card, CardContent } from "@repo/ui/components/card"
import { Badge } from "@repo/ui/components/badge"
import { MessageCircle, Trophy, Users } from "lucide-react"

export function SocialFeaturesSection() {
  return (
    <section id="social" className="py-20 bg-gradient-to-br from-purple-50/30 to-pink-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-brand-pink/10 text-brand-pink">
            Social Learning
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Learn Together, Grow Together</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with peers, share knowledge, and achieve more through collaborative learning
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-primary to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Study Groups</h3>
              <p className="text-white/90">
                Form study groups with friends and collaborate in real-time on challenging topics.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-brand-pink to-pink-600 text-white">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Leaderboards</h3>
              <p className="text-white/90">
                Compete with friends and track your progress on global and course-specific leaderboards.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-gray-700 to-gray-900 text-white">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Learning Sessions</h3>
              <p className="text-white/90">
                Join structured learning sessions and participate in topic-focused discussions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
