import { ReactNode, Suspense } from "react";
import SubjectSidebar from "@/app/(app)/(explorer)/subjects/[subjectId]/SubjectSidebar";

export default function Layout({ children, aside, params }: {
    children: ReactNode,
    aside: ReactNode,
    params: Promise<{ subjectId: string }>
}) {
    // TODO: Add motion to the aside
    return <div className="flex w-full h-full flex-grow items-stretch justify-stretch flex-col md:flex-row">
        <Suspense><SubjectSidebar params={params}/></Suspense>
        <div className="flex-grow w-full overflow-auto">
            {children}
        </div>
        {aside}
    </div>;
}