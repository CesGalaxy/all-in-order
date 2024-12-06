"use client";

import { Button } from "@nextui-org/button";
import {
    IconDatabase,
    IconNote,
    IconNotebook,
    IconSettings,
    IconShare,
    IconTypography,
    IconUsers
} from "@tabler/icons-react";
import { Tooltip } from "@nextui-org/tooltip";
import NotebookSidebarPages from "@/app/topics/[topicId]/notebook/_feature/components/navigation/NotebookSidebarPages";
import Image from "next/image";
import LogoNameCol from "@/assets/logo/NameCol.svg";
import { Link } from "@nextui-org/link";

export default function NotebookSidebar() {
    return <aside
        className="bg-content2 sticky top-16 h-[calc(100vh-64px)] min-w-16 divide-y-large divide-y-reverse divide-divider"
    >
        <div className="divide-x-large flex divide-divider h-full w-full">
            <nav className="w-16 flex flex-col items-center justify-between py-4">
                <ul className="w-16 flex flex-col items-center gap-4">
                    <li>
                        <Tooltip placement="right" delay={200} closeDelay={0} content={"Pages"}>
                            <Button isIconOnly>
                                <IconNotebook/>
                            </Button>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip placement="right" delay={200} closeDelay={0} content={"Vocabulary"}>
                            <Button isIconOnly>
                                <IconTypography/>
                            </Button>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip placement="right" delay={200} closeDelay={0} content={"Notes"}>
                            <Button isIconOnly>
                                <IconNote/>
                            </Button>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip placement="right" delay={200} closeDelay={0} content={"Data"}>
                            <Button isIconOnly>
                                <IconDatabase/>
                            </Button>
                        </Tooltip>
                    </li>
                </ul>
                <ul className="w-16 flex flex-col items-center gap-4">
                    <li>
                        <Tooltip placement="right" delay={200} closeDelay={0} content={"Share"}>
                            <Button isIconOnly>
                                <IconShare/>
                            </Button>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip placement="right" delay={200} closeDelay={0} content={"Editors"}>
                            <Button isIconOnly>
                                <IconUsers/>
                            </Button>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip placement="right" delay={200} closeDelay={0} content={"Settings"}>
                            <Button isIconOnly>
                                <IconSettings/>
                            </Button>
                        </Tooltip>
                    </li>
                </ul>
            </nav>
            <NotebookSidebarPages/>
        </div>
        <header className="absolute w-full h-16 -top-16 bg-content2">
            <Link href="/">
                <Image src={LogoNameCol} alt="All In Order" height={64} priority/>
            </Link>
        </header>
    </aside>
}