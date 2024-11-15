"use client";

import { Link } from "@nextui-org/link";
import { IconFolders, IconHome, IconMessage, IconMessages, IconPlayerPlay, IconTool } from "@tabler/icons-react";
import { useCallback } from "react";
import { Divider } from "@nextui-org/divider";
import { usePathname } from "next/navigation";

const DESTINATIONS = [
    { name: "Overview", path: "", icon: <IconHome/> },
    { name: "Files", path: "files", icon: <IconFolders/> },
    { name: "Practice", path: "practice", icon: <IconPlayerPlay/> },
    { name: "Community", path: "community", icon: <IconMessages/> },
    { name: "Talk with AI", path: "ai", icon: <IconMessage/> },
    { name: "Settings", path: "settings", icon: <IconTool/> },
]

export interface TopicSidebarProps {
    topicId?: number | string;
    topicTitle?: string;
    topicDescription?: string | null;
}

export default function TopicSidebar({ topicId, topicTitle, topicDescription }: TopicSidebarProps) {
    const topicPath = topicId ? "/topics/" + topicId + "/" : "";

    const pathname = usePathname();

    const isCurrentPath = useCallback((path: string) => pathname === topicPath + (path ? (path + "/") : ""), [pathname, topicPath]);

    return <div className="w-full h-full">
        <header>
            <h1 className="text-2xl">{topicTitle || "LOADING..."}</h1>
            <p className="text-foreground-500">{topicDescription}</p>
        </header>
        <Divider className="my-4"/>
        <nav>
            <ul className="w-full flex flex-wrap lg:flex-col sm:gap-1 lg:gap-4">
                {DESTINATIONS.map(({ name, path, icon }) => <li key={path}>
                    <Link
                        href={topicPath + path}
                        className="w-full md:text-lg gap-1 sm:gap-2 md:gap-4 rounded-full px-2 py-1 lg:px-4 lg:py-2 hover:bg-content2 text-foreground transition-all"
                    >
                        {icon}{name}
                    </Link>
                </li>)}
            </ul>
        </nav>
    </div>
}
