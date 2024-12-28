'use client'

import { NextUIProvider } from "@nextui-org/system";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function AppProvidersClient({ children }: { children: ReactNode }) {
    const router = useRouter();

    return <NextUIProvider navigate={router.push} className="w-full h-full">
        {children}
    </NextUIProvider>;
}