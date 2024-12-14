export default function GenericCardSkeleton() {
    return <div className="p-4 bg-white shadow rounded-lg">
        <div className="animate-pulse h-32 bg-gray-200 rounded-lg"/>
        <div className="flex justify-between items-center mt-2">
            <div className="flex gap-2">
                <div className="animate-pulse h-4 w-16 bg-gray-200 rounded-lg"/>
                <div className="animate-pulse h-4 w-16 bg-gray-200 rounded-lg"/>
            </div>
            <div className="animate-pulse h-6 w-6 bg-gray-200 rounded-full"/>
        </div>
    </div>;
}