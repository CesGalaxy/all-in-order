"use client";

import { Tab, Tabs } from "@nextui-org/tabs";

export type PracticeTab = "overview" | "edit" | "attempts" | "stats";

export default function PracticePreviewTabs({ currentTab, practiceId }: {
    currentTab?: PracticeTab,
    practiceId?: number
}) {
    return <Tabs aria-label="Pages" selectedKey={currentTab}>
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