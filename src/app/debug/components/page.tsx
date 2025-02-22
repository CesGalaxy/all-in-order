"use client";

import { Tab, Tabs } from "@heroui/tabs";
import DebugUI from "@/app/debug/components/ui";

export default function Page() {
    return <div>
        <Tabs>
            <Tab title="UI">
                <DebugUI/>
            </Tab>
        </Tabs>
    </div>
}