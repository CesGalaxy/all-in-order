import { type ReactNode } from "react";

export default async function Layout({ children, sidebar }: {
    children: ReactNode,
    sidebar: ReactNode,
}) {
    return <div className="flex w-full h-full flex-grow items-stretch justify-stretch flex-col md:flex-row">
        {sidebar}
        <div className="flex-grow w-full overflow-auto">
            {children}
        </div>
    </div>;
}