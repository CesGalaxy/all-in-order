import { ReactNode, Suspense } from "react";
import RefineProvider from "@/app/admin/_reactivity/providers/RefineProvider";

export default function Layout({ children }: { children: ReactNode }) {
    return <Suspense>
        <RefineProvider>
            {children}
        </RefineProvider>
    </Suspense>;
}