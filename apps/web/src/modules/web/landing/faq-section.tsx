"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card"
import { Badge } from "@repo/ui/components/badge"
import { ChevronDown } from "lucide-react"

export function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs = [
    {
      question: "How does the AI learning work?",
      answer:
        "Our AI analyzes your learning patterns to create personalized quizzes, explanations, and study recommendations.",
    },
    {
      question: "What's included in the free beta?",
      answer: "The free beta includes basic AI features, up to 5 courses, community access, and 1GB storage.",
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use enterprise-grade encryption and comply with all privacy regulations to keep your data safe.",
    },
    {
      question: "Can I collaborate with others?",
      answer: "You can form study groups, participate in learning sessions, and compete on leaderboards.",
    },
    {
      question: "When will the mobile app launch?",
      answer: "We're actively developing mobile apps for iOS and Android, expected to launch in Q2 2024.",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-brand-pink/10 text-brand-pink">
            FAQ
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Common Questions</h2>
          <p className="text-xl text-gray-600">Quick answers to help you get started</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardHeader
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                <CardTitle className="text-lg flex items-center justify-between">
                  {faq.question}
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      openFAQ === index ? "rotate-180" : ""
                    }`}
                  />
                </CardTitle>
              </CardHeader>
              {openFAQ === index && (
                <CardContent className="pt-0 animate-in slide-in-from-top-2 duration-200">
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
