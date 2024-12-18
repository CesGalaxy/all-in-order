"use client";

import NotebookAside from "@/app/topics/[topicId]/notebook/_feature/components/containers/NotebookAside";
import { use, useMemo } from "react";
import useNotebookVocabulary from "@/app/topics/[topicId]/notebook/_feature/reactivity/hooks/useNotebookVocabulary";
import { Button, ButtonGroupProvider } from "@nextui-org/button";
import {
    IconClipboardPlus,
    IconDeviceGamepad2,
    IconDots,
    IconDownload,
    IconEdit,
    IconMeteor,
    IconPercentage,
    IconPrinter,
    IconShare,
    IconTextPlus,
    IconTimeline,
    IconTrash
} from "@tabler/icons-react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/dropdown";

export interface Params {
    topicId: string;
    encodedAreaName: string;
}

export default function Page({ params }: { params: Promise<Params> }) {
    const { encodedAreaName } = use(params);
    const { areas } = useNotebookVocabulary();
    const areaName = decodeURIComponent(encodedAreaName);
    const area = useMemo(() => areas.find(area => area.name === areaName), [areas, areaName]);

    if (!area) return <NotebookAside title={"Error 404"}>Not found</NotebookAside>;

    const { id, icon, name, description } = area;

    return <NotebookAside
        title={<b className="text-lg">{icon} {name}</b>}
        footer={<div className="p-2 flex gap-2">
            <Button
                color="primary"
                className="basis-1/2"
                startContent={<IconDeviceGamepad2/>}
            >Practice</Button>
            <Popover>
                <PopoverTrigger>
                    <Button className="basis-1/4" startContent={<IconTimeline/>}>Stats</Button>
                </PopoverTrigger>
                <PopoverContent>{titleProps => <>
                    <div className="px-1 py-2 w-full min-w-64 flex flex-col gap-2">
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
                    </div>
                </>}</PopoverContent>
            </Popover>
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        className="basis-1/4"
                        startContent={<IconDots/>}
                    >More</Button>
                </DropdownTrigger>
                <DropdownMenu>
                    <DropdownSection showDivider title={"Manage"}>
                        <DropdownItem startContent={<IconTextPlus/>} key="new_definition">
                            New definition
                        </DropdownItem>
                        <DropdownItem startContent={<IconEdit/>} key="edit">
                            Edit
                        </DropdownItem>
                        <DropdownItem startContent={<IconClipboardPlus/>} key="add_to_page">
                            Add to page
                        </DropdownItem>
                    </DropdownSection>
                    <DropdownSection showDivider title={"More"}>
                        <DropdownItem startContent={<IconShare/>} key="share">
                            Share
                        </DropdownItem>
                        <DropdownItem startContent={<IconDownload/>} key="download" shortcut="Ctrl + D">
                            Download
                        </DropdownItem>
                        <DropdownItem startContent={<IconPrinter/>} key="print" shortcut="Ctrl + P">
                            Print
                        </DropdownItem>
                    </DropdownSection>
                    <DropdownItem color="danger" startContent={<IconTrash/>} key="delete" className="text-danger">
                        Delete
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>}
    >

    </NotebookAside>;
}