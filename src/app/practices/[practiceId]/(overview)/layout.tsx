import type React from "react";
import Navigation from "@/app/practices/[practiceId]/(overview)/_components/Navigation";

export default function Layout({ children, params: { practiceId } }: {
    children: React.ReactNode,
    params: { practiceId: string }
}) {
    return <>
        <Navigation practiceId={practiceId}/>
        {children}
    </>
}