"use client";

import { Link } from "@heroui/link";
import {
    IconFolders,
    IconHome,
    IconLayoutSidebarLeftCollapse,
    IconMessage,
    IconMessages,
    IconNotebook,
    IconNotes,
    IconPlayerPlay,
    IconTool
} from "@tabler/icons-react";
import { Divider } from "@heroui/divider";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/button";
import { useState } from "react";

const DESTINATIONS = [
    { name: "Overview", path: "", icon: <IconHome/> },
    { name: "Summary", path: "summary", icon: <IconNotes/> },
    { name: "Notebook", path: "notebook", icon: <IconNotebook/> },
    { name: "Files", path: "files", icon: <IconFolders/> },
    { name: "Practice", path: "practice", icon: <IconPlayerPlay/> },
    { name: "Community", path: "community", icon: <IconMessages/> },
    { name: "Talk with AI", path: "ai", icon: <IconMessage/> },
    { name: "Settings", path: "settings", icon: <IconTool/> },
]

const DESTINATION_CLASS = "w-full md:text-lg gap-1 sm:gap-2 md:gap-4 rounded-full px-2 py-1 lg:px-4 lg:py-2 hover:bg-content2 transition-all";

export interface TopicSidebarProps {
    topicId: number | string;
    topicTitle: string;
    topicDescription?: string | null;
}

export default function TopicSidebar({ topicId, topicTitle, topicDescription }: TopicSidebarProps) {
    const topicPath = "/topics/" + topicId;
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return <div className="w-full h-full space-y-4">
        {collapsed || <header className="lg:min-w-48">
            <h1 className="text-2xl">{topicTitle}</h1>
            <p className="text-foreground-500">{topicDescription}</p>
        </header>}
        {collapsed || <Divider/>}
        <nav>
            <ul className="w-fit flex flex-wrap lg:flex-col sm:gap-1 lg:gap-4">
                {DESTINATIONS.map(({ name, path, icon }) => <li key={path}>
                    <Link
                        aria-label={name}
                        title={collapsed ? name : undefined}
                        href={topicPath + "/" + path}
                        className={DESTINATION_CLASS}
                        color={pathname === topicPath + "/" + (path ? path + "/" : "") ? "primary" : "foreground"}
                    >
                        {icon}{collapsed || name}
                    </Link>
                </li>)}
            </ul>
        </nav>
        <Button isIconOnly variant="light" className="ml-2 hidden lg:flex"
                onPress={() => setCollapsed(!collapsed)}><IconLayoutSidebarLeftCollapse/></Button>
    </div>
}
