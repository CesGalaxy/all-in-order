'use client'

import {NextUIProvider} from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";

export function Providers({children}: { children: React.ReactNode }) {
    const router = useRouter();

    return (
        <NextUIProvider navigate={router.push} className="w-full h-full">
            <ToastContainer position="bottom-right" />
            {children}
        </NextUIProvider>
    )
}