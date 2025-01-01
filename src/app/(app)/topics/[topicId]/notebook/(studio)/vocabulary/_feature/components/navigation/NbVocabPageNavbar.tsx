"use client";

import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import {
    IconBooks,
    IconChevronDown,
    IconClipboardPlus,
    IconDeviceGamepad2,
    IconDots,
    IconDownload,
    IconEdit,
    IconLayoutGrid,
    IconMeteor,
    IconNotebook,
    IconPercentage,
    IconPrinter,
    IconShare,
    IconTextPlus,
    IconTextSpellcheck,
    IconTimeline,
    IconTrash,
    IconVocabulary
} from "@tabler/icons-react";
import { Button, ButtonGroup, ButtonGroupProvider } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/dropdown";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import useNotebook from "@/app/(app)/topics/[topicId]/notebook/_feature/reactivity/hooks/useNotebook";
import NbVocabAreaDownloadOptions
    from "@/app/(app)/topics/[topicId]/notebook/(studio)/vocabulary/_feature/components/navigation/NbVocabAreaDownloadOptions";

const PRACTICE_MODES = [
    {
        key: "memory_cards",
        label: "Memory cards",
        description: "Match the word with the definition",
        icon: IconLayoutGrid
    },
    {
        key: "spell",
        label: "Spell",
        description: "Write the word that matches the definition",
        icon: IconTextSpellcheck
    }
]

export interface NbVocabPageNavbarProps {
    area: {
        id: number;
        icon: string | null;
        name: string;
    }
}

export default function NbVocabPageNavbar({ area: { id, icon, name } }: NbVocabPageNavbarProps) {
    const { topic, topicId } = useNotebook();

    return <Navbar isBordered maxWidth="full">
        <NavbarContent justify="start" className="hidden lg:flex">
            <NavbarItem>
                <Breadcrumbs>
                    <BreadcrumbItem
                        startContent={<IconBooks/>} href={`/topics/${topicId}`}
                    >{topic ? topic.title : "Topic"}</BreadcrumbItem>
                    <BreadcrumbItem
                        startContent={<IconNotebook/>}
                        href={`/topics/${topicId}/notebook`}
                    >Notebook</BreadcrumbItem>
                    <BreadcrumbItem
                        startContent={<IconVocabulary/>}
                        href={`/topics/${topicId}/notebook/vocabulary`}
                    >Vocabulary</BreadcrumbItem>
                    <BreadcrumbItem
                        startContent={icon}
                        href={`/topics/${topicId}/notebook/vocabulary/${encodeURIComponent(name)}`}
                    >&nbsp;{name}</BreadcrumbItem>
                </Breadcrumbs>
            </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
            <Button size="lg" isIconOnly variant="light" className="hidden lg:inline-flex">
                <IconPrinter/>
            </Button>
            <Popover>
                <PopoverTrigger>
                    <Button size="lg" isIconOnly variant="light">
                        <IconDownload/>
                    </Button>
                </PopoverTrigger>
                <NbVocabAreaDownloadOptions/>
            </Popover>
            <Button size="lg" isIconOnly variant="light" className="hidden lg:inline-flex">
                <IconShare/>
            </Button>
            <Dropdown>
                <DropdownTrigger>
                    <Button size="lg" isIconOnly>
                        <IconDots/>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu>
                    <DropdownItem startContent={<IconTextPlus/>} key="new_definition">
                        New definition
                    </DropdownItem>
                    <DropdownItem startContent={<IconEdit/>} key="edit">
                        Edit
                    </DropdownItem>
                    <DropdownItem startContent={<IconClipboardPlus/>} key="add_to_page">
                        Add to page
                    </DropdownItem>
                    <DropdownSection showDivider title={"More"} className="lg:hidden">
                        <DropdownItem startContent={<IconPrinter/>} key="print">
                            Print
                        </DropdownItem>
                        <DropdownItem startContent={<IconShare/>} key="share">
                            Share
                        </DropdownItem>
                    </DropdownSection>
                    <DropdownItem color="danger" startContent={<IconTrash/>} key="delete" className="text-danger">
                        Delete
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <NavbarItem>
                <ButtonGroup size="lg" color="primary">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button startContent={<IconDeviceGamepad2/>}>
                                Practice
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            {PRACTICE_MODES.map((mode) =>
                                <DropdownItem
                                    key={mode.key}
                                    description={mode.description}
                                    startContent={<mode.icon size={32}/>}
                                    href={"practice?mode=" + mode.key}
                                >
                                    {mode.label}
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    <Popover placement="bottom-end" backdrop="opaque">
                        <PopoverTrigger>
                            <Button isIconOnly><IconChevronDown/></Button>
                        </PopoverTrigger>
                        <PopoverContent>{titleProps => <div className="px-1 py-2 w-full min-w-64 flex flex-col gap-2">
                            <p className="text-small font-bold text-foreground" {...titleProps}>
                                Stats
                            </p>
                            <ul className="divide-y divide-divider">
                                <li className="flex gap-4 items-center bg-content2 hover:bg-content3 first:rounded-t-xl last:rounded-b-xl py-1 px-2">
                                    <IconPercentage size={32}/>
                                    <span className="flex flex-col flex-start">
                                            <span>Perfection</span>
                                            <b>100%</b>
                                        </span>
                                </li>
                                <li className="flex gap-4 items-center bg-content2 hover:bg-content3 first:rounded-t-xl last:rounded-b-xl py-1 px-2">
                                    <IconMeteor size={32}/>
                                    <span className="flex flex-col flex-start">
                                            <span>Attempts</span>
                                            <b>12</b>
                                        </span>
                                </li>
                                <li className="flex gap-4 items-center bg-content2 hover:bg-content3 first:rounded-t-xl last:rounded-b-xl py-1 px-2">
                                    <IconTimeline size={32}/>
                                    <span className="flex flex-col flex-start">
                                            <span>Latest attempt</span>
                                            <b>Yesterday</b>
                                        </span>
                                </li>
                            </ul>
                            <ButtonGroupProvider value={undefined as any}>
                                <Button startContent={<IconShare/>}>Share</Button>
                                <Button color="danger" startContent={<IconTrash/>}>Delete</Button>
                            </ButtonGroupProvider>
                        </div>}</PopoverContent>
                    </Popover>
                </ButtonGroup>
            </NavbarItem>
        </NavbarContent>
    </Navbar>
}