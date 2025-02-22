import { ReactNode } from "react";
import AsideModalContainer from "@/components/containers/AsideModal";

interface Params {
    topicId: string,
}

export default async function Layout({ children }: {
    children: ReactNode,
    params: Promise<Params>
}) {
    return <AsideModalContainer
        className="lg:w-1/2 md:w-2/3"
        // contentClassName=""
        animate
        showExpandButton
    >
        {children}
    </AsideModalContainer>
}