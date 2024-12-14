"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { IconCategory, IconDeviceFloppy, IconDownload, IconPrinter } from "@tabler/icons-react";

export default function NbPageFAB() {
    return <Dropdown>
        <DropdownTrigger>
            <Button isIconOnly size="lg" radius="full" className="absolute bottom-4 right-4" variant="light">
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
    </Dropdown>;
}