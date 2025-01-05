import type { ReactNode } from "react";

export default function Layout({ children, aside }: { children: ReactNode, aside: ReactNode }) {
    // TODO: Add motion to the aside
    return <>
        {children}
        {aside}
    </>;
}