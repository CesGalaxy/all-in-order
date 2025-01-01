"use client";

import { IconChevronDown } from "@tabler/icons-react";
import { Button, ButtonGroup } from "@nextui-org/button";
import NbNotesPageSearchbar
    from "@/app/(app)/topics/[topicId]/notebook/(studio)/notes/_feature/components/molecules/NbNotesPageSearchbar";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";

export default function NbNotesPageNavbar() {
    return <header className="flex items-center justify-between w-full">
        <NbNotesPageSearchbar/>
        <nav className="flex items-center">
            <ButtonGroup color="primary">
                <Button>Add New</Button>
                <Dropdown>
                    <DropdownTrigger>
                        <Button isIconOnly><IconChevronDown/></Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem key="upload">Upload</DropdownItem>
                        <DropdownItem key="hfjdksh">Refresh</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </ButtonGroup>
        </nav>
    </header>;
}