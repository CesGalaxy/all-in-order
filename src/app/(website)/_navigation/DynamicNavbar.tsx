"use client";

import { usePathname } from "next/navigation";
import { type ReactNode, useMemo } from "react";
import { Navbar } from "@nextui-org/navbar";

export default function DynamicNavbar({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    const type = useMemo(() => pathname.match(
            /^\/topics\/([^\/]+)\/docs\/([^\/]+)\/edit\/?$/
        ) ? "edit" : "normal",
        [pathname]
    );

    return type === "normal"
        ? <Navbar shouldHideOnScroll isBordered className="transition-background h-16">
            {children}
        </Navbar> : null;
}