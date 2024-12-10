import AsideModalContainer from "@/components/containers/AsideModal";
import { Skeleton } from "@nextui-org/skeleton";
import PracticePreviewTabs from "@/app/topics/[topicId]/(hub)/_components/navigation/PracticePreviewTabs";

export default function Loading() {
    return <AsideModalContainer
        className="md:min-w-96 md:w-1/2"
        actions={<PracticePreviewTabs/>}
        animate
    >
        <div className="w-full space-y-5 p-4">
            <Skeleton className="rounded-lg">
                <div className="h-6 rounded-lg bg-default-200"/>
            </Skeleton>
            <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300"/>
            </Skeleton>
            <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"/>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg bg-default-200"/>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"/>
                </Skeleton>
            </div>
        </div>
    </AsideModalContainer>;
}