'use client'

import { NextUIProvider } from "@nextui-org/system";
import { ToastContainer } from "react-toastify";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";

export function ProvidersClient({ children }: { children: ReactNode }) {
    const router = useRouter();

    return <NextUIProvider navigate={router.push} className="w-full h-full">
        <ToastContainer position="bottom-right"/>
        {children}
    </NextUIProvider>;
}