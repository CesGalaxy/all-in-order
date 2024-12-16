import NotebookAside from "@/app/topics/[topicId]/notebook/_feature/components/containers/NotebookAside";
import { Skeleton } from "@nextui-org/skeleton";

export default function Loading() {
    return <NotebookAside
        title={<Skeleton className="rounded-lg w-32">
            <div className="h-6 rounded-lg bg-default-300"/>
        </Skeleton>}
    >
        <div className="max-w-96 w-full space-y-5 p-4">
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
    </NotebookAside>
}