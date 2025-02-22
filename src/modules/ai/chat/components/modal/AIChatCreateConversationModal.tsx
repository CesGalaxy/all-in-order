"use client";

import ModalForm from "@/components/utils/ModalForm";
import React, { useState } from "react";
import { ActionResponse } from "@/lib/helpers/form";
import { Input } from "@heroui/input";
import { IconBrandGoogle, IconBrandOpenai, IconBrandX, IconMessagePlus, IconSparkles } from "@tabler/icons-react";
import { Select, SelectItem } from "@heroui/select";

const models = [
    {
        key: "AI-0",
        label: "AI-0",
        description: "Full-featured AI model",
        icon: IconSparkles,
        enabled: true,
        state: "BETA",
    },
    {
        key: "gemini",
        label: "Gemini",
        description: "Google's AI model (limited features)",
        icon: IconBrandGoogle,
        enabled: false,
    },
    {
        key: "chatgpt",
        label: "ChatGPT",
        description: "OpenAI's AI model (limited features)",
        icon: IconBrandOpenai,
        enabled: false,
    },
    {
        key: "grok",
        label: "Grok 3",
        description: "xAI model (coming soon)",
        icon: IconBrandX,
        enabled: false,
    },
]

export default function AIChatCreateConversationModal({ startConversationAction }: {
    startConversationAction?: () => Promise<ActionResponse<any>>
}) {
    const [title, setTitle] = useState("");
    const [model, setModel] = useState<typeof models[any]["key"]>(models[0].key);

    const modelInfo = models.find(({ key }) => key == model)!;
    const ModelIcon = modelInfo.icon;

    return <ModalForm
        title={"Start a conversation"}
        isFormValid={!!title}
        action={startConversationAction}
        buttonLabel={title ? "Start conversation" : "Let the AI decide"}
        buttonIcon={title ? <IconMessagePlus/> : <IconSparkles/>}
    >
        <Input
            value={title}
            onValueChange={setTitle}
            label={"Conversation title"}
        />
        <Select
            items={models}
            label={"AI model"}
            selectedKeys={[model]}
            onSelectionChange={({ currentKey }) => currentKey && setModel(currentKey)}
            startContent={<ModelIcon/>}
            classNames={{ value: "font-mono" }}
            disabledKeys={models.filter(({ enabled }) => !enabled).map(({ key }) => key)}
        >
            {({ key, label, description, icon: I, state }) => <SelectItem
                key={key}
                startContent={<I/>}
                description={description}
                endContent={state}
            >{label}</SelectItem>}
        </Select>
    </ModalForm>;
}