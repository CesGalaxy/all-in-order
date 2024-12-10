import PageContainer from "@/components/containers/PageContainer";
import { IconLoader2 } from "@tabler/icons-react";

export default function LoadingSpinnerPage() {
    return <PageContainer className="h-full flex items-center justify-center flex-wrap gap-8 py-16 animate-pulse">
        <IconLoader2 size={48} className="animate-spin text-primary"/>
        <p className="text-3xl md:text-6xl font-bold">Loading</p>
    </PageContainer>
}