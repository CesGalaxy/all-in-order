"use client";

import React from "react";
import { Avatar } from "@heroui/avatar";
import AIChatFeatures from "@/modules/ai/chat/components/AIChatFeatures";
import AIChatHeader from "@/modules/ai/chat/components/AIChatHeader";

export default function AIChatEmpty() {
    return <>
        <AIChatHeader/>
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
