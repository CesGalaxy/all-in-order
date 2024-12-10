import type { ReactNode } from "react";
import AsideModalContainer from "@/components/containers/AsideModal";

export default function Layout({ children }: { children: ReactNode }) {
    return <AsideModalContainer>
        {children}
    </AsideModalContainer>
}