"use client";

import React from "react";
import { Avatar } from "@heroui/avatar";
import { Tab, Tabs } from "@heroui/tabs";
import AIChatFeatures from "@/modules/ai/chat/components/AIChatFeatures";
import { Button } from "@heroui/button";
import { IconHistory, IconMessagePlus, IconSettings } from "@tabler/icons-react";

export default function AIChatEmpty() {
    return <>
        <nav className="w-full flex md:grid md:grid-cols-3 sm:overflow-x-visible overflow-x-auto sm:scrollbar-hide">
            <ul className="flex items-start gap-2">
                <li>
                    <Button isIconOnly variant="light">
                        <IconMessagePlus/>
                    </Button>
                </li>
                <li>
                    <Button isIconOnly variant="light">
                        <IconHistory/>
                    </Button>
                </li>
            </ul>
            <Tabs className="w-full justify-center">
                <Tab key="creative" title="Creative"/>
                <Tab key="technical" title="Technical"/>
                <Tab key="precise" title="Precise"/>
            </Tabs>
            <ul className="flex items-center justify-end">
                <li>
                    <Button isIconOnly variant="light">
                        <IconSettings/>
                    </Button>
                </li>
            </ul>
        </nav>
        <div className="flex h-full flex-col justify-center gap-10">
            <div className="flex w-full flex-col items-center justify-center gap-2">
                <Avatar
                    size="lg"
                    src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatar_ai.png"
                />
                <h1 className="text-xl font-medium text-default-700">How can I help you today?</h1>
            </div>
            <AIChatFeatures/>
        </div>
    </>;
}
