import { type ReactNode } from "react";

export default function Layout({ children, navigation, sidebar }: {
    children: ReactNode,
    navigation: ReactNode,
    sidebar: ReactNode
}) {
    return <div className="w-full h-full flex-grow flex flex-col">
        {navigation}
        <div className="flex w-full h-full flex-grow items-stretch justify-stretch flex-col md:flex-row">
            {sidebar}
            <div className="flex-grow w-full">
                {children}
            </div>
        </div>
    </div>
}