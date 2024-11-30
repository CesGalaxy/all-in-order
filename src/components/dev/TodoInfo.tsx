import type { ReactNode } from "react";

export default function TodoInfo({ children }: { children: ReactNode }) {
    return <p className="p-4">
        <span className="font-bold uppercase bg-content3 text-content3-foreground rounded px-1">{"TODO"}:</span>
        &nbsp;
        {children}
    </p>
}