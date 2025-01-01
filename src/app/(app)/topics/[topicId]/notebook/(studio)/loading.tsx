import { Divider } from "@nextui-org/divider";
import { Skeleton } from "@nextui-org/skeleton";

export default function Loading() {
    return <div className="w-full h-full flex-grow overflow-auto flex items-center justify-center">
        <div className="gap-4 min-w-96">
            <h1 className="text-3xl font-semibold col-span-2 text-center">Notebook</h1>
            <Divider/>
            <br/>
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
    </div>
}