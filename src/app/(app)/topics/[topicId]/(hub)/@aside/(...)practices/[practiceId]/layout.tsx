import { ReactNode, Suspense, use } from "react";
import PracticePreviewTabs from "@/app/(app)/topics/[topicId]/(hub)/_components/navigation/PracticePreviewTabs";
import AsideModalContainer from "@/components/containers/AsideModal";
import { getTopicAsidePractice } from "@/app/(app)/topics/[topicId]/(hub)/@aside/(...)practices/[practiceId]/query";
import { Skeleton } from "@nextui-org/skeleton";

interface Params {
    topicId: string,
    practiceId: string
}

export default async function Layout({ children, params }: {
    children: ReactNode,
    params: Promise<Params>
}) {
    const { practiceId } = await params;

    return <AsideModalContainer
        title={
            <Suspense fallback={
                <Skeleton className="rounded-lg">
                    <div className="h-6 w-32 rounded-lg bg-default-300"/>
                </Skeleton>
            }>
                <Title practiceId={practiceId}/>
            </Suspense>
        }
        className="md:w-1/2 md:min-w-96"
        actions={<PracticePreviewTabs practiceId={practiceId}/>}
        contentClassName="p-4"
        animate
        showExpandButton
    >
        {children}
    </AsideModalContainer>
}

function Title({ practiceId }: { practiceId: string }) {
    const { data, error } = use(getTopicAsidePractice(practiceId));
    if (error) console.error(error)
    return data ? data.title : "Practice";
}