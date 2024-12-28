"use client";

import { Tab, Tabs } from "@nextui-org/tabs";
import { usePathname } from "next/navigation";

export type PracticeTab = "overview" | "edit" | "attempts" | "stats";

export default function PracticePreviewTabs({ practiceId }: {
    currentTab?: PracticeTab,
    practiceId?: number | string
}) {
    const pathname = usePathname();

    return <Tabs aria-label="Pages" selectedKey={pathname}>
        <Tab
            key={`/practices/${practiceId}/`}
            title="Overview"
            href={`/practices/${practiceId}/`}
        />
        <Tab
            key={`/practices/${practiceId}/edit/`}
            title="Edit"
            href={`/practices/${practiceId}/edit/`}
        />
        <Tab
            key={`/practices/${practiceId}/attempts/`}
            title="Attempts"
            href={`/practices/${practiceId}/attempts/`}
        />
        <Tab
            key={`/practices/${practiceId}/stats/`}
            title="Stats"
            href={`/practices/${practiceId}/stats/`}
        />
    </Tabs>
}