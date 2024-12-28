"use client";

import { Button } from "@nextui-org/button";
import { IconFolders, IconList, IconSearch, IconSparkles } from "@tabler/icons-react";

export default function EditorToolbar() {
    return <ul className="w-full flex flex-col items-center gap-4">
        <li><Button isIconOnly radius="full"><IconList/></Button></li>
        <li><Button isIconOnly radius="full"><IconFolders/></Button></li>
        <li><Button isIconOnly radius="full"><IconSearch/></Button></li>
        <li>
            <Button
                isIconOnly
                radius="full"
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            >
                <IconSparkles/>
            </Button>
        </li>
    </ul>;
}