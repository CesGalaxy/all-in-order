export default function GenericCardSkeleton() {
    return <div className="p-4 bg-content1 shadow rounded-lg">
        <div className="animate-pulse h-32 bg-content2 rounded-lg"/>
        <div className="flex justify-between items-center mt-2">
            <div className="flex gap-2">
                <div className="animate-pulse h-4 w-16 bg-content2 rounded-lg"/>
                <div className="animate-pulse h-4 w-16 bg-content2 rounded-lg"/>
            </div>
            <div className="animate-pulse h-6 w-6 bg-content2 rounded-full"/>
        </div>
    </div>;
}

export function GenericCardGridSkeleton({ amount = 6 }: { amount?: number }) {
    return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(amount)].map((_, i) => <GenericCardSkeleton key={i}/>)}
    </div>;
}