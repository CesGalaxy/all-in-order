import type React from "react";

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    tabs?: string[];
    children: React.ReactNode;
}

export default function PageContainer({ className, ...props }: PageContainerProps) {
    return <main className={"w-full h-full px-4 md:p-8 xl:px-16 py-8 overflow-auto " + className} {...props} />;
}