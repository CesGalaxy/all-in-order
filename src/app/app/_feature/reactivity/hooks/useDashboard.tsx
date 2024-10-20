"use client";

import { useContext } from "react";
import DashboardContext from "@/app/app/_feature/reactivity/context/DashboardContext";

export default function useDashboard() {
    const context = useContext(DashboardContext);

    if (!context) throw new Error("useDashboard must be used in a DashboardContext");

    return context;
}