"use client";

import { Button } from "@nextui-org/button";
import {
    IconAccessible,
    IconArrowBack,
    IconCode,
    IconDatabase,
    IconFlask,
    IconHelp,
    IconHistoryToggle,
    IconLayout,
    IconMenuDeep,
    IconNote,
    IconNotebook,
    IconScript,
    IconSettings,
    IconShare,
    IconTool,
    IconTypography,
    IconUsers,
    IconX
} from "@tabler/icons-react";
import { Tooltip } from "@nextui-org/tooltip";
import NotebookSidebarPages
    from "@/app/(app)/topics/[topicId]/notebook/_feature/components/navigation/NotebookSidebarPages";
import Image from "next/image";
import LogoNameCol from "@/assets/logo/NameCol.svg";
import { Link } from "@nextui-org/link";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/dropdown";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NotebookSidebarVocabulary
    from "@/app/(app)/topics/[topicId]/notebook/_feature/components/navigation/NotebookSidebarVocabulary";
import useNotebook from "@/app/(app)/topics/[topicId]/notebook/_feature/reactivity/hooks/useNotebook";
import { usePathname } from "next/navigation";

const SIDEBARS = {
    "pages": { tooltip: "Pages", icon: <IconNotebook/> },
    "vocabulary": { tooltip: "Vocabulary", icon: <IconTypography/> },
    "notes": { tooltip: "Notes", icon: <IconNote/> },
    "data": { tooltip: "Data", icon: <IconDatabase/> }
};

export type SidebarType = "pages" | "vocabulary" | "notes" | "data";

export default function NotebookSidebar() {
    const { topic, topicId } = useNotebook();
    const [sidebar, setSidebar] = useState<SidebarType | null>("vocabulary");
    const [show, setShow] = useState(false);
    const pathname = usePathname();

    const SidebarContent = useMemo(() => {
        switch (sidebar) {
            case "pages":
                return NotebookSidebarPages;
            case "vocabulary":
                return NotebookSidebarVocabulary;
        }
    }, [sidebar]);

    useEffect(() => setShow(false), [pathname]);

    const openSidebar = (newSidebar: SidebarType) => setSidebar(newSidebar === sidebar ? null : newSidebar);

    return <>
        <nav className="md:hidden border-b border-b-divider sticky top-16 flex items-center justify-between">
            <header className="ps-2 font-bold">
                {topic && <Link href={`/topics/${topic.id}`} underline="hover" color="foreground" size="lg">
                    <h1>{topic.title}</h1>
                </Link>}
            </header>
            <Button radius="none" onPress={() => setShow(true)}>
                <IconMenuDeep/>
            </Button>
        </nav>
        <aside
            className={"bg-content2 md:sticky top-16 h-[calc(100vh-64px)] md:min-w-16 md:w-auto shrink-0 "
                + "divide-y-large divide-y-reverse divide-divider "
                + "fixed w-full z-50 md:z-auto "
                + (show ? "" : "hidden md:block")}
        >
            <div className="divide-x-large flex divide-divider h-full w-full">
                <nav className="w-16 flex flex-col items-center justify-between py-4">
                    <ul className="w-16 flex flex-col items-center gap-4">
                        <li className="md:hidden">
                            <Tooltip placement="right" delay={200} closeDelay={0} content={"Close menu"}>
                                <Button isIconOnly onPress={() => setShow(false)} variant="faded">
                                    <IconX/>
                                </Button>
                            </Tooltip>
                        </li>
                        {Object.entries(SIDEBARS).map(([key, { tooltip, icon }]) => (
                            <li key={key}>
                                <Tooltip placement="right" delay={200} closeDelay={0} content={tooltip}>
                                    <Button isIconOnly onPress={() => openSidebar(key as SidebarType)}>
                                        {icon}
                                    </Button>
                                </Tooltip>
                            </li>
                        ))}
                    </ul>
                    <ul className="w-16 flex flex-col items-center gap-4">
                        <li>
                            <Tooltip placement="right" delay={200} closeDelay={0} content={"Back to topic"}>
                                <Button isIconOnly variant="light" as={Link} href={"/topics/" + topicId}>
                                    <IconArrowBack/>
                                </Button>
                            </Tooltip>
                        </li>
                        <li>
                            <Tooltip placement="right" delay={200} closeDelay={0} content={"Share"}>
                                <Button isIconOnly><IconShare/></Button>
                            </Tooltip>
                        </li>
                        <li>
                            <Tooltip placement="right" delay={200} closeDelay={0} content={"Editors"}>
                                <Button isIconOnly><IconUsers/></Button>
                            </Tooltip>
                        </li>
                        <Dropdown>
                            <Tooltip placement="right" delay={200} closeDelay={0} content={"Settings"}>
                                <li>
                                    <DropdownTrigger>
                                        <Button isIconOnly><IconSettings/></Button>
                                    </DropdownTrigger>
                                </li>
                            </Tooltip>
                            <DropdownMenu>
                                <DropdownSection showDivider>
                                    <DropdownItem key="macros" startContent={<IconScript/>}>
                                        Macros
                                    </DropdownItem>
                                    <DropdownItem key="devs" startContent={<IconCode/>}>
                                        Developers
                                    </DropdownItem>
                                    <DropdownItem key="history" startContent={<IconHistoryToggle/>}>
                                        History
                                    </DropdownItem>
                                </DropdownSection>
                                <DropdownSection showDivider>
                                    <DropdownItem key="layout" startContent={<IconLayout/>}>
                                        Layout
                                    </DropdownItem>
                                    <DropdownItem key="experiments" startContent={<IconFlask/>}>
                                        Experiments
                                    </DropdownItem>
                                </DropdownSection>
                                <DropdownSection>
                                    <DropdownItem key="help" startContent={<IconHelp/>}>
                                        Help & docs
                                    </DropdownItem>
                                    <DropdownItem key="accessibility" startContent={<IconAccessible/>}>
                                        Accessibility
                                    </DropdownItem>
                                    <DropdownItem key="preferences" startContent={<IconTool/>}>
                                        Preferences
                                    </DropdownItem>
                                </DropdownSection>
                            </DropdownMenu>
                        </Dropdown>
                    </ul>
                </nav>
                <AnimatePresence initial={false}>
                    {
                        SidebarContent && <motion.div
                            // key={sidebar}
                            className="h-full overflow-y-auto overflow-x-hidden"
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "100%" }}
                            exit={{ opacity: 0, width: 0 }}
                        >
                            <SidebarContent/>
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
            <header className="absolute w-full h-16 -top-16 bg-content2">
                <Link href="/public">
                    <Image src={LogoNameCol} alt="All In Order" height={64} priority/>
                </Link>
            </header>
        </aside>
    </>
}