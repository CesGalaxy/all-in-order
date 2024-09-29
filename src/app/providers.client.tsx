'use client'

import { NextUIProvider } from "@nextui-org/system";
import { useTransitionRouter } from "next-view-transitions";
import { ToastContainer } from "react-toastify";

export function ProvidersClient({ children }: { children: React.ReactNode }) {
    const router = useTransitionRouter();

    return <NextUIProvider navigate={router.push} className="w-full h-full">
        <ToastContainer position="bottom-right"/>
        {children}
    </NextUIProvider>;
}