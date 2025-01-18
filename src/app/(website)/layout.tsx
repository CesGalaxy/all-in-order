import type React from "react";
import AppNavbar from "@/app/(website)/_navigation/Navbar";
import AppCmdk from "@/features/cmdk/components/AppCmdk";

export default function Layout({ children }: Readonly<{
    children: React.ReactNode;
    navbar: React.ReactNode;
}>) {
    return <>
        <div className="w-full min-h-full flex flex-col items-stretch justify-stretch">
            <AppNavbar/>
            {children}
        </div>
        <AppCmdk/>
    </>;
}
