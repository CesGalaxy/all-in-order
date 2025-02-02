"use client";

import { Button } from "@heroui/button";
import { IconFolders, IconList, IconSearch, IconSparkles } from "@tabler/icons-react";
import { Tooltip } from "@heroui/tooltip";
import { useState } from "react";
import DocEditorChat from "@/modules/docs/app/components/chat/DocEditorChat";
import EditorConfigBtn from "@/modules/docs/app/components/navigation/EditorConfigBtn";
import { Link } from "@heroui/link";
import Image from "next/image";
import LogoIcoCol from "@/assets/logo/IcoCol.svg";

type Tool = "ai";

export default function EditorToolbar() {
    const [tool, setTool] = useState<Tool>();

    const toggleTool = (t?: Tool) => setTool(t === tool ? undefined : t);

    return <>
        <aside
            className="w-full lg:w-16 lg:sticky top-0 flex lg:flex-col justify-between items-center lg:h-dvh z-50 bg-background shrink-0">
            <nav className="w-full grow flex lg:flex-col items-center justify-between p-4 lg:pb-3 lg:px-0">
                <ul className="w-full flex lg:flex-col items-center gap-4">
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
                                radius={tool === "ai" ? "md" : "full"}
                                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                                onPress={() => toggleTool("ai")}
                            >
                                <IconSparkles/>
                            </Button>
                        </Tooltip>
                    </li>
                </ul>
                <EditorConfigBtn/>
            </nav>
            <div
                className="h-16 bottom-full lg:w-full flex items-center justify-center lg:border-t lg:border-t-divider">
                <Link href="/">
                    <Image src={LogoIcoCol} alt="All In Order" height={64} priority/>
                </Link>
            </div>
        </aside>
        {tool === "ai" && <DocEditorChat/>}
    </>;
}