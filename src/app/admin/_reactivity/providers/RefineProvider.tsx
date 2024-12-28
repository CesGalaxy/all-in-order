"use client";

import { Authenticated, Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import { PropsWithChildren } from "react";
import exampleProvider from "@/app/admin/_data/example";
import authProvider from "@/app/admin/_app/providers/auth";
import AdminLogin from "@/app/admin/_pages/AdminLogin";

export default function RefineProvider({ children }: PropsWithChildren) {
    return <Refine
        routerProvider={routerProvider}
        dataProvider={exampleProvider}
        authProvider={authProvider}
    >
        <Authenticated key="root-layout" fallback={<AdminLogin/>}>
            {children}
        </Authenticated>
    </Refine>
}