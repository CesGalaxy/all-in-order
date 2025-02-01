'use client'

import { ReactNode, useEffect } from "react";
import { HeroUIProvider } from "@heroui/system";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

declare global {
    interface Window {
        AIO_USER_REFRESHED: boolean;
    }
}

export default function RootProvidersClient({ children }: { children: ReactNode }) {
    const router = useRouter();

    // Prevent initial flash of white background
    useEffect(() => document.body.classList.add("transition-background"));

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

    return <HeroUIProvider navigate={router.push} className="w-full h-full">
        {children}
        <ToastContainer position="bottom-right"/>
    </HeroUIProvider>;
}