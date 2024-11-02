'use client'

import { NextUIProvider } from "@nextui-org/system";
import { ToastContainer } from "react-toastify";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

declare global {
    interface Window {
        AIO_USER_REFRESHED: boolean;
    }
}

export function ProvidersClient({ children }: { children: ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        if (typeof window == undefined) return;
        if (window.AIO_USER_REFRESHED) return;
        // Make a post request to /api/auth/refresh to refresh the auth token
        fetch("/api/auth/refresh", {
            method: "POST",
            credentials: "include"
        }).then((value) => {
            console.info("Auth token refreshed correctly!")
            console.debug(value)
            window.AIO_USER_REFRESHED = true;
        }).catch((reason) => {
            console.info("Error refreshing auth token!")
            console.error(reason)
        }).finally(() => {
            console.debug("Auth token refresh request finished!")
        });
    }, []);

    return <NextUIProvider navigate={router.push} className="w-full h-full">
        <ToastContainer position="bottom-right"/>
        {children}
    </NextUIProvider>;
}