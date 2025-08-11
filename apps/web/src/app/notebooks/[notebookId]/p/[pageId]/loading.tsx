import { Skeleton } from "@repo/ui/components/skeleton";

export default function Loading() {
    return <div className="grow flex items-center justify-center">
        <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
        </div>
    </div>
}