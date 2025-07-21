import { HeroSection } from "@/modules/web/landing/hero-section"
import { AIFeaturesSection } from "@/modules/web/landing/ai-features-section"
import { OrganizationSection } from "@/modules/web/landing/organization-section"
import { IntegrationSection } from "@/modules/web/landing/integration-section"
import { SocialFeaturesSection } from "@/modules/web/landing/social-features-section"
import { PricingSection } from "@/modules/web/landing/pricing-section"
import { FAQSection } from "@/modules/web/landing/faq-section"

export default function LandingPage() {
    return (
        <div className="min-h-screen">
            <HeroSection />
            <AIFeaturesSection />
            <OrganizationSection />
            <IntegrationSection />
            <SocialFeaturesSection />
            <PricingSection />
            <FAQSection />
        </div>
    )
}