import TopicRecentPracticesSection
    from "@/app/(app)/topics/[topicId]/(hub)/_components/organisms/TopicRecentPracticesSection";
import PageContainer from "@/components/containers/PageContainer";
import TopicRecentDocsSection from "@/app/(app)/topics/[topicId]/(hub)/_components/organisms/TopicRecentDocsSection";
import { Suspense } from "react";
import LoadingSpinnerPage from "@/components/pages/LoadingSpinnerPage";
import TopicRecentNbPagesSection
    from "@/app/(app)/topics/[topicId]/(hub)/_components/organisms/TopicRecentNbPagesSection";
import { Skeleton } from "@heroui/skeleton";
import TopicRecentNotesSection from "@/app/(app)/topics/[topicId]/(hub)/_components/organisms/TopicRecentNotesSection";

export default async function Page({ params }: {
    params: Promise<{ topicId: string }>,
    searchParams: Promise<Record<string, string | string[]>>
}) {
    const { topicId: rawTopicId } = await params;
    const topicId = parseInt(rawTopicId);

    return <PageContainer className="flex-grow grid xl:grid-cols-2 gap-x-8">
        <div className="xl:col-span-2">
            <Suspense fallback={<Skeleton className="h-12 w-full rounded-xl"/>}>
                <TopicRecentNbPagesSection topicId={topicId}/>
            </Suspense>
        </div>
        <div>
            <Suspense fallback={<LoadingSpinnerPage/>}>
                <TopicRecentPracticesSection topicId={topicId}/>
            </Suspense>
        </div>
        <div className="space-y-8">
            <Suspense fallback={<LoadingSpinnerPage/>}>
                <TopicRecentDocsSection topicId={topicId}/>
            </Suspense>
            <TopicRecentNotesSection topicId={topicId}/>
        </div>
    </PageContainer>;
}