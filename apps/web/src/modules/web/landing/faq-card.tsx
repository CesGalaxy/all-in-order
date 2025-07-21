"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface FAQCardProps {
  question: string
  answer: string | React.ReactNode
}

export function FAQCard({ question, answer }: FAQCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setIsOpen(!isOpen)}>
        <CardTitle className="text-lg flex items-center justify-between">
          {question}
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </CardTitle>
      </CardHeader>
      {isOpen && (
        <CardContent className="pt-0 animate-in slide-in-from-top-2 duration-200">
          <div className="text-gray-600">{answer}</div>
        </CardContent>
      )}
    </Card>
  )
}
