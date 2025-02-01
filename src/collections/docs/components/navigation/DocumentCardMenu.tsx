"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { IconCopy, IconCopyCheck, IconDots, IconEdit, IconShare, IconTool, IconTrash } from "@tabler/icons-react";

export default function DocumentCardMenu() {
    return <Dropdown>
        <DropdownTrigger>
            <Button isIconOnly>
                <IconDots/>
            </Button>
        </DropdownTrigger>
        <DropdownMenu>
            <DropdownSection title="Actions" showDivider>
                <DropdownItem
                    key="new"
                    startContent={<IconEdit/>}
                >
                    Edit file
                </DropdownItem>
                <DropdownItem
                    key="edit"
                    startContent={<IconCopyCheck/>}
                >
                    Duplicate
                </DropdownItem>
                <DropdownItem
                    key="props"
                    startContent={<IconTool/>}
                >
                    Properties
                </DropdownItem>
            </DropdownSection>
            <DropdownSection title="Share" showDivider>
                <DropdownItem
                    key="copy"
                    startContent={<IconCopy/>}
                >
                    Copy link
                </DropdownItem>
                <DropdownItem
                    key="share"
                    startContent={<IconShare/>}
                >
                    Share
                </DropdownItem>
            </DropdownSection>
            <DropdownSection title="Danger zone">
                <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    startContent={<IconTrash/>}
                >
                    Delete file
                </DropdownItem>
            </DropdownSection>
        </DropdownMenu>
    </Dropdown>
}