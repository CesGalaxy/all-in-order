import GenericCardSkeleton from "@/components/common/GenericCardSkeleton";

export default function DashboardCoursesListSkeleton() {
    return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => <GenericCardSkeleton key={i}/>)}
    </div>;
}