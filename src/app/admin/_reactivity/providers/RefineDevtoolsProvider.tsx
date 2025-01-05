"use client";

import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import type { PropsWithChildren } from "react";

export default function RefineDevtoolsProvider(props: PropsWithChildren) {
    return <DevtoolsProvider>
        {props.children}
        <DevtoolsPanel/>
    </DevtoolsProvider>;
};