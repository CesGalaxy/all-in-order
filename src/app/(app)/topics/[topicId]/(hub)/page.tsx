import TopicRecentPracticesSection
    from "@/app/(app)/topics/[topicId]/(hub)/_components/templates/TopicRecentPracticesSection";
import PageContainer from "@/components/containers/PageContainer";
import TopicRecentDocsSection from "@/app/(app)/topics/[topicId]/(hub)/_components/templates/TopicRecentDocsSection";
import { Suspense } from "react";
import LoadingSpinnerPage from "@/components/pages/LoadingSpinnerPage";

export default async function Page({ params }: {
    params: Promise<{ topicId: string }>,
    searchParams: Promise<Record<string, string | string[]>>
}) {
    const { topicId } = await params;

    return <PageContainer className="flex-grow grid xl:grid-cols-2 gap-8">
        <Suspense fallback={<LoadingSpinnerPage/>}>
            <TopicRecentPracticesSection topicId={parseInt(topicId)}/>
        </Suspense>
        <Suspense fallback={<LoadingSpinnerPage/>}>
            <TopicRecentDocsSection topicId={parseInt(topicId)}/>
        </Suspense>
    </PageContainer>;
}