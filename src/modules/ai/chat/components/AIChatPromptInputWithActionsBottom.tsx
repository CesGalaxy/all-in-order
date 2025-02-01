"use client";

import React from "react";
import { IconArrowUp, IconMicrophone, IconNotes, IconPaperclip } from "@tabler/icons-react";
import AIChatPromptInput from "@/modules/ai/chat/components/AIChatPromptInput";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { cn } from "@heroui/theme";
import { ScrollShadow } from "@heroui/scroll-shadow";

export default function AIChatPromptInputWithActions({}) {
    const ideas = [
        {
            title: "Create a blog post about HeroUI",
            description: "explain it in simple terms",
        },
        {
            title: "Give me 10 ideas for my next blog post",
            description: "include only the best ideas",
        },
        {
            title: "Compare HeroUI with other UI libraries",
            description: "be as objective as possible",
        },
        {
            title: "Write a text message to my friend",
            description: "be polite and friendly",
        },
    ];

    const [prompt, setPrompt] = React.useState<string>("");

    return (
        <div className="flex w-full flex-col gap-4">
            <ScrollShadow hideScrollBar className="flex flex-nowrap gap-2 max-w-full" orientation="horizontal">
                <div className="flex gap-2">
                    {ideas.map(({ title, description }, index) => (
                        <Button key={index} className="flex h-14 flex-col items-start gap-0" variant="flat">
                            <p>{title}</p>
                            <p className="text-default-500">{description}</p>
                        </Button>
                    ))}
                </div>
            </ScrollShadow>
            <form
                className="flex w-full flex-col items-start rounded-medium bg-default-100 transition-colors hover:bg-default-200/70">
                <AIChatPromptInput
                    classNames={{
                        inputWrapper: "!bg-transparent shadow-none",
                        innerWrapper: "relative",
                        input: "pt-1 pl-2 pb-6 !pr-10 text-medium",
                    }}
                    endContent={
                        <div className="flex items-end gap-2">
                            <Tooltip showArrow content="Send message">
                                <Button
                                    isIconOnly
                                    color={!prompt ? "default" : "primary"}
                                    isDisabled={!prompt}
                                    radius="lg"
                                    size="sm"
                                    variant="solid"
                                >
                                    <IconArrowUp
                                        className={cn(
                                            "[&>path]:stroke-[2px]",
                                            !prompt ? "text-default-600" : "text-primary-foreground",
                                        )}
                                        width={20}
                                    />
                                </Button>
                            </Tooltip>
                        </div>
                    }
                    minRows={3}
                    radius="lg"
                    value={prompt}
                    variant="flat"
                    onValueChange={setPrompt}
                />
                <div className="flex w-full items-center justify-between gap-8 overflow-x-auto px-4 pb-4">
                    <div className="flex w-full gap-1 md:gap-3">
                        <Button
                            size="sm"
                            startContent={
                                <IconPaperclip className="text-default-500" width={18}/>
                            }
                            variant="flat"
                        >
                            Attach
                        </Button>
                        <Button
                            size="sm"
                            startContent={
                                <IconMicrophone className="text-default-500" width={18}/>
                            }
                            variant="flat"
                        >
                            Voice Commands
                        </Button>
                        <Button
                            size="sm"
                            startContent={
                                <IconNotes className="text-default-500" width={18}/>
                            }
                            variant="flat"
                        >
                            Templates
                        </Button>
                    </div>
                    <p className="py-1 text-tiny text-default-400">{prompt.length}/2000</p>
                </div>
            </form>
        </div>
    );
}