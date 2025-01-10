"use client";

import { Link } from "@nextui-org/link";
import {
    IconFolders,
    IconHome,
    IconMessage,
    IconMessages,
    IconNotebook,
    IconNotes,
    IconPlayerPlay,
    IconTool
} from "@tabler/icons-react";
import { Divider } from "@nextui-org/divider";
import { usePathname } from "next/navigation";

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

    return <div className="w-full h-full">
        <header>
            <h1 className="text-2xl">{topicTitle}</h1>
            <p className="text-foreground-500">{topicDescription}</p>
        </header>
        <Divider className="my-4"/>
        <nav>
            <ul className="w-full flex flex-wrap lg:flex-col sm:gap-1 lg:gap-4">
                {DESTINATIONS.map(({ name, path, icon }) => <li key={path}>
                    <Link
                        href={topicPath + "/" + path}
                        className={DESTINATION_CLASS}
                        color={pathname === topicPath + "/" + (path ? path + "/" : "") ? "primary" : "foreground"}
                    >
                        {icon}{name}
                    </Link>
                </li>)}
            </ul>
        </nav>
    </div>
}
