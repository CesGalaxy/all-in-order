"use client";

import { usePathname } from "next/navigation";
import { Tab, Tabs } from "@heroui/tabs";
import { useMemo } from "react";

export default function PracticePageNavigation({ practiceId }: { practiceId: number | string }) {
    const pathname = usePathname();

    const currentTab = useMemo(() => {
        if (pathname.includes("attempts")) return "attempts";
        if (pathname.includes("stats")) return "stats";
        if (pathname.includes("edit")) return "edit";
        return "overview";
    }, [pathname]);

    return <Tabs
        className="w-screen"
        classNames={{ tabList: "w-full rounded-none" }}
        color="primary"
        selectedKey={currentTab}
    >
        <Tab
            key="overview"
            title="Overview"
            href={`/practices/${practiceId}/`}
        />
        <Tab
            key="attempts"
            title="Attempts"
            href={`/practices/${practiceId}/attempts`}
        />
        <Tab
            key="stats"
            title="Stats"
            href={`/practices/${practiceId}/stats`}
        />
        <Tab
            key="edit"
            title="Edit practice"
            href={`/practices/${practiceId}/edit`}
        />
    </Tabs>;
}