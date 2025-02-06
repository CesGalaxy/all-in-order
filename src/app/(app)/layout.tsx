import type React from "react";
import AppNavbar from "@/app/(website)/_navigation/WebsiteNavbar";
import AppCmdk from "@/features/cmdk/components/AppCmdk";

export default function Layout({ children, aside }: Readonly<{
    children: React.ReactNode;
    aside: React.ReactNode;
}>) {
    return <>
        <div className="w-full min-h-full flex flex-col items-stretch justify-stretch">
            <AppNavbar/>
            {children}
        </div>
        {aside}
        <AppCmdk/>
    </>;
}
