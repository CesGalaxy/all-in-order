import { type ReactNode } from "react";
import { Navigation } from "@/modules/web/globals/navigation";
import { Footer } from "@/modules/web/globals/footer";

export default function Layout({children}: {children: ReactNode}) {
    return <>
        <Navigation/>
        {children}
        <Footer />
    </>
}