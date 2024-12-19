"use client";

import { Tab, Tabs } from "@nextui-org/tabs";

export type PracticeTab = "overview" | "edit" | "attempts" | "stats";

export default function PracticePreviewTabs({ practiceId }: {
    currentTab?: PracticeTab,
    practiceId?: number | string
}) {
    return <Tabs aria-label="Pages">
        <Tab
            key="overview"
            title="Overview"
            href={`/practices/${practiceId}/`}
        />
        <Tab
            key="edit"
            title="Edit"
            href={`/practices/${practiceId}/edit`}
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
    </Tabs>
}