import type React from "react";

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    tabs?: string[];
    children: React.ReactNode;
}

export default function PageContainer({ className, ...props }: PageContainerProps) {
    return <main className={"w-full h-full p-4 md:p-8 xl:px-16 md:py-8 overflow-auto " + className} {...props} />;
}