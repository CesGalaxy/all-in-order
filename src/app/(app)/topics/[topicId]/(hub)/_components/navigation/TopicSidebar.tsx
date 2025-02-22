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
import { ScrollShadow } from "@heroui/scroll-shadow";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";

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

const DESTINATION_CLASS = "w-full md:text-lg gap-1 sm:gap-2 rounded-full px-2 py-1 lg:px-3 lg:py-1.5 hover:bg-content2 transition-all w-max";

export interface TopicSidebarProps {
    topicId: number | string;
    topicTitle: string;
    topicDescription?: string | null;
}

export default function TopicSidebar({ topicId, topicTitle, topicDescription }: TopicSidebarProps) {
    const topicPath = "/topics/" + topicId;
    const pathname = usePathname();

    const [identifier, ...name] = topicTitle.split(": ");

    return <div className="w-full h-16 flex items-center bg-content1">
        <header className="px-4 max-md:grow shrink-0">
            <h1 className="text-2xl">{name.length > 0 ? <>
                <span className="text-foreground-500 font-medium">{identifier}: </span>
                <span>{name.join(": ")}</span>
            </> : identifier}</h1>
            <p className="text-foreground-500">{topicDescription}</p>
        </header>
        <Divider orientation="vertical"/>
        <ScrollShadow
            as="nav"
            hideScrollBar
            orientation="horizontal"
            className="justify-self-end w-full grow max-md:hidden"
        >
            <ul className="w-fit flex items-center sm:gap-1 lg:gap-2 px-2">
                {DESTINATIONS.map(({ name, path, icon }) => <li key={path}>
                    <Link
                        aria-label={name}
                        // title={collapsed ? name : undefined}
                        href={topicPath + "/" + path}
                        className={DESTINATION_CLASS}
                        color={pathname === topicPath + "/" + (path ? path + "/" : "") ? "primary" : "foreground"}
                    >
                        {icon}{name}
                    </Link>
                </li>)}
            </ul>
        </ScrollShadow>
        <Dropdown>
            <DropdownTrigger>
                <Button className="w-16 shrink-0 h-16 flex md:hidden" size="lg" isIconOnly radius="none">
                    <IconLayoutSidebarLeftCollapse/></Button>
            </DropdownTrigger>
            <DropdownMenu>
                {DESTINATIONS.map(({ name, path, icon }) => <DropdownItem
                    key={path}
                    aria-label={name}
                    // title={collapsed ? name : undefined}
                    href={topicPath + "/" + path}
                    color={pathname === topicPath + "/" + (path ? path + "/" : "") ? "primary" : undefined}
                    startContent={icon}
                >{name}</DropdownItem>)}
            </DropdownMenu>
        </Dropdown>
    </div>
}
