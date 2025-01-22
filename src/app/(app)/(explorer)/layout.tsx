import { type ReactNode } from "react";
import { headers } from "next/headers";
import { isUserAgentMobile } from "@/lib/utils/web";
import ExplorerMobileSidebar from "@/app/(app)/(explorer)/ExplorerMobileSidebar";

export default async function Layout({ children, sidebar }: {
    children: ReactNode,
    sidebar: ReactNode
}) {
    const headersList = await headers()
    const userAgent = headersList.get('user-agent')
    const isMobile = userAgent ? isUserAgentMobile(userAgent) : false;

    return <div className="flex w-full h-full flex-grow items-stretch justify-stretch flex-col md:flex-row">
        {isMobile ? <ExplorerMobileSidebar>{sidebar}</ExplorerMobileSidebar> : sidebar}
        <div className="flex-grow w-full overflow-auto">
            {children}
        </div>
    </div>;
}