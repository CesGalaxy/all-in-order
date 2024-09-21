import type { ReactNode } from "react";

export default function Layout({ children, aside }: { children: ReactNode, aside: React.ReactNode }) {
    return <>
        {children}
        {aside}
    </>;
}