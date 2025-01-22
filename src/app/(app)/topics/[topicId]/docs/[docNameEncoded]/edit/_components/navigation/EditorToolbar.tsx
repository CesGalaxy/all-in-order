"use client";

import { Button } from "@nextui-org/button";
import { IconFolders, IconList, IconSearch, IconSparkles } from "@tabler/icons-react";
import { Tooltip } from "@nextui-org/tooltip";

export default function EditorToolbar() {
    return <ul className="w-full flex lg:flex-col items-center gap-4">
        <li>
            <Tooltip content="Table of contents" placement="right" delay={200} closeDelay={0}>
                <Button isIconOnly radius="full"><IconList/></Button>
            </Tooltip>
        </li>
        <li>
            <Tooltip content="Assets" placement="right" delay={200} closeDelay={0}>
                <Button isIconOnly radius="full"><IconFolders/></Button>
            </Tooltip>
        </li>
        <li>
            <Tooltip content="Search" placement="right" delay={200} closeDelay={0}>
                <Button isIconOnly radius="full"><IconSearch/></Button>
            </Tooltip>
        </li>
        <li>
            <Tooltip content="Talk with AI" placement="right" delay={200} closeDelay={0}>
                <Button
                    isIconOnly
                    radius="full"
                    className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                >
                    <IconSparkles/>
                </Button>
            </Tooltip>
        </li>
    </ul>;
}