"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { IconCategory, IconDeviceFloppy, IconDownload, IconListTree, IconPrinter } from "@tabler/icons-react";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import useNotebookPage from "@/modules/notebook/pages/reactivity/hooks/useNotebookPage";
import NbPageTableOfContents from "@/modules/notebook/pages/components/navigation/NbPageTableOfContents";

export default function NbPageFAB() {
    const { tocItems } = useNotebookPage();

    return <nav className="fixed bottom-4 right-4 flex items-end gap-4 flex-col">
        <Popover shouldCloseOnScroll={false}>
            <PopoverTrigger>
                <Button isIconOnly size="lg" radius="full" variant="light">
                    <IconListTree/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="items-stretch max-w-96 ">
                <NbPageTableOfContents items={tocItems}/>
            </PopoverContent>
        </Popover>
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly size="lg" radius="full" variant="light">
                    <IconCategory/>
                </Button>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownItem key="download" startContent={<IconDownload/>} shortcut="⌘⇧D">
                    Download
                </DropdownItem>
                <DropdownItem key="print" startContent={<IconPrinter/>} shortcut="⌘P">
                    Print
                </DropdownItem>
                <DropdownItem key="save" startContent={<IconDeviceFloppy/>} shortcut="⌘S">
                    Save
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </nav>;
}