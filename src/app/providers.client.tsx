'use client'

import { ToastContainer } from "react-toastify";
import { ReactNode } from "react";

export function RootProvidersClient({ children }: { children: ReactNode }) {
    return <>
        <ToastContainer position="bottom-right"/>
        {children}
    </>;
}