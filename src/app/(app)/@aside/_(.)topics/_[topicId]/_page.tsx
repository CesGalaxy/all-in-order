"use client";

import { Tab, Tabs } from "@heroui/tabs";

export default function _page() {
    return <div className="">
        <Tabs className="" color="primary" variant="underlined" fullWidth>
            <Tab title="Overview"/>
            <Tab title="Files" href={"files"}/>
            <Tab title="Practice" href={"practice"}/>
            <Tab title="AI Chat" href={"ai"}/>
            <Tab title="Notebook" href={"notebook"}/>
            <Tab title="Settings" href={"settings"}/>
        </Tabs>
        <p>Hello world</p>
    </div>
}