import { Badge } from "@repo/ui/components/badge"
import Image from "next/image"
import NameCol from "@/assets/logo/NameCol.svg"
import { Suspense } from "react";
import AuthButtons from "@/modules/web/globals/auth-buttons";
import Link from "next/link";

export function Navigation() {
  return (
    <nav className="border-b bg-foreground/5 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <Image src={NameCol} alt="All In Order" height={23} priority/>
              </Link>
              <div className="flex items-center space-x-2">
                {/*<span className="text-xl font-bold text-gray-900">All In Order</span>*/}
                <Badge variant="secondary" className="bg-brand-pink/10 text-brand-pink border-brand-pink/20 text-xs max-sm:hidden">
                  BETA
                </Badge>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/#features" className="text-gray-600 hover:text-primary transition-colors font-medium">
                Features
              </Link>
              <Link href="/#pricing" className="text-gray-600 hover:text-primary transition-colors font-medium">
                Pricing
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-primary transition-colors font-medium">
                Blog
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-primary transition-colors font-medium">
                About
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Suspense>
              <AuthButtons/>
            </Suspense>
          </div>
        </div>
      </div>
    </nav>
  )
}
