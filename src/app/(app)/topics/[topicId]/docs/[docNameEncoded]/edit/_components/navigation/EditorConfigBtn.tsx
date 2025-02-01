"use client";

import { IconSettings } from "@tabler/icons-react";
import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";

export default function EditorConfigBtn() {
    return <Dropdown>
        <DropdownTrigger>
            <Button isIconOnly radius="full" variant="light"><IconSettings/></Button>
        </DropdownTrigger>
        <DropdownMenu>
            <DropdownItem key="accessibility">Accessibility</DropdownItem>
            <DropdownItem key="color-theme">Color theme</DropdownItem>
            <DropdownItem key="preferences">Preferences</DropdownItem>
        </DropdownMenu>
    </Dropdown>;
}