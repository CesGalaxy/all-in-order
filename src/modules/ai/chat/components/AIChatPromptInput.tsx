"use client";

import type { TextAreaProps } from "@heroui/input";
import { Textarea } from "@heroui/input";

import React from "react";
import { cn } from "@heroui/theme";

export default function AIChatPromptInput({ classNames = {}, ...props }: TextAreaProps) {
    return <Textarea
        aria-label="Prompt"
        className="min-h-[40px]"
        classNames={{
            ...classNames,
            label: cn("hidden", classNames?.label),
            input: cn("py-0", classNames?.input),
        }}
        minRows={1}
        placeholder="Enter a prompt here"
        radius="lg"
        variant="bordered"
        {...props}
    />;
}