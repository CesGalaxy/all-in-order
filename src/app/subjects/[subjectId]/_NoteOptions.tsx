"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/dropdown";
import { IconChevronDown, IconCopy, IconEdit, IconPin, IconTrash } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";

export default function NoteOptions() {
    return <Dropdown>
        <DropdownTrigger>
            <Button isIconOnly>
                <IconChevronDown/>
            </Button>
        </DropdownTrigger>
        <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
            <DropdownSection title="Actions" showDivider>
                <DropdownItem
                    key="new"
                    description="Pin the note to the top"
                    startContent={<IconPin/>}
                >
                    Pin note
                </DropdownItem>
                <DropdownItem
                    key="copy"
                    description="Copy the shareable link"
                    startContent={<IconCopy/>}
                >
                    Copy link
                </DropdownItem>
                <DropdownItem
                    key="edit"
                    description="Edit the note contents"
                    startContent={<IconEdit/>}
                >
                    Edit note
                </DropdownItem>
            </DropdownSection>
            <DropdownSection title="Danger zone">
                <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    description="Permanently delete the note"
                    startContent={<IconTrash/>}
                >
                    Delete note
                </DropdownItem>
            </DropdownSection>
        </DropdownMenu>
    </Dropdown>
}