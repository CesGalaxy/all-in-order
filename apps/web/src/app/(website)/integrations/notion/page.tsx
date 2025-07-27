import { NotionHeroSection } from "@/modules/web/integrations/notion-hero-section"
import { NotionFeaturesSection } from "@/modules/web/integrations/notion-features-section"
import { NotionSyncSection } from "@/modules/web/integrations/notion-sync-section"
import { NotionAutomationSection } from "@/modules/web/integrations/notion-automation-section"
import { NotionAISection } from "@/modules/web/integrations/notion-ai-section"
import { NotionCTASection } from "@/modules/web/integrations/notion-cta-section"

export default function NotionIntegrationPage() {
    return (
        <div className="min-h-screen">
            <NotionHeroSection />
            <NotionFeaturesSection />
            <NotionSyncSection />
            <NotionAutomationSection />
            <NotionAISection />
            <NotionCTASection />
        </div>
    )
}
