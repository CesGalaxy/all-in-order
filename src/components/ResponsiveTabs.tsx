import React, { useState } from "react";

export interface ResponsiveTabsProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode[];
    tabs: string[];
}

export const GRIDS = [
    "xl:grid-cols-1", "xl:grid-cols-2", "xl:grid-cols-3", "xl:grid-cols-4", "xl:grid-cols-5", "xl:grid-cols-6",
    "xl:grid-cols-7", "xl:grid-cols-8", "xl:grid-cols-9", "xl:grid-cols-10", "xl:grid-cols-11", "xl:grid-cols-12",
];

export default function ResponsiveTabs({ children, tabs, ...props }: ResponsiveTabsProps) {
    const [selectedTab, setSelectedTab] = useState(0);

    return <div {...props}>
        <nav className="flex gap-2 overflow-x-auto">
            {tabs.map((tab, index) => <button key={index} className="px-4 py-2 bg-primary-500 text-white rounded-md">
                {tab}
            </button>)}
        </nav>
        <div className="flex flex-col gap-4">
            {children}
        </div>
    </div>;
}