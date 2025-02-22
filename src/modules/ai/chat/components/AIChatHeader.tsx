"use client";

import { Button } from "@heroui/button";
import { IconHistory, IconMessagePlus, IconSettings } from "@tabler/icons-react";
import { Tab, Tabs } from "@heroui/tabs";
import React from "react";

export default function AIChatHeader() {
    return <nav className="w-full flex md:grid md:grid-cols-3 sm:overflow-x-visible overflow-x-auto sm:scrollbar-hide">
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
    </nav>;
}