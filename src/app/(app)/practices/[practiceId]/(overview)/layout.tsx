import type React from "react";
import PracticePageNavigation from "@/app/(app)/practices/[practiceId]/(overview)/_components/PracticePageNavigation";

export default async function Layout({ params, children }: {
    children: React.ReactNode,
    params: Promise<{ practiceId: string }>
}) {
    const { practiceId } = await params;

    return <>
        <PracticePageNavigation practiceId={practiceId}/>
        {children}
    </>
}