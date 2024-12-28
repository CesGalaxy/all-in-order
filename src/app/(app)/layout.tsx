import type React from "react";
import AppProviders from "@/app/(app)/providers";
import AppNavbar from "@/app/(app)/_navigation/Navbar";

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
    navbar: React.ReactNode;
}>) {
    return <AppProviders>
        <div className="w-full min-h-full flex flex-col items-stretch justify-stretch">
            <AppNavbar/>
            {children}
        </div>
    </AppProviders>;
}
