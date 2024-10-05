import type React from "react";
import Navigation from "@/app/practices/[practiceId]/(overview)/_Navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="w-full h-full layout-practices flex flex-col">
        <Navigation/>
        <div className="w-full h-full flex-grow">
            {children}
        </div>
    </div>
}