import type { PropsWithChildren, ReactNode } from "react";

export default function Layout({ children, aside }: PropsWithChildren<{ aside: ReactNode }>) {
    return <>
        {children}
        <div className="absolute w-0 h-0 overflow-hidden">{aside}</div>
    </>;
}