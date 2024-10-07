import type { ReactNode } from "react";

export default function Layout({ children, aside }: { children: ReactNode, aside: ReactNode }) {
    return <>
        {children}
        {aside}
    </>;
}