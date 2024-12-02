"use client";

import { IconSettings } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";

export default function EditorConfigBtn() {
    return <Dropdown>
        <DropdownTrigger>
            <Button isIconOnly radius="full" variant="light"><IconSettings/></Button>
        </DropdownTrigger>
        <DropdownMenu>
            <DropdownItem>Accessibility</DropdownItem>
            <DropdownItem>Color theme</DropdownItem>
            <DropdownItem>Preferences</DropdownItem>
        </DropdownMenu>
    </Dropdown>;
}