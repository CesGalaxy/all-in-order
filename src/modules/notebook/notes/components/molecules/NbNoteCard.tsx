"use client";

import { NotebookNoteEntity } from "@/modules/notebook/app/supabase/db/NotebookData";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/dropdown";
import { IconCopy, IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { cn } from "@nextui-org/theme";

const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

export default function NbNoteCard({ note: { title, content } }: { note: Omit<NotebookNoteEntity, "notebook"> }) {
    return <Dropdown backdrop="opaque">
        <DropdownTrigger>
            <Card isPressable className="w-full">
                {title && <CardHeader>{title}</CardHeader>}
                <CardBody>{content}</CardBody>
            </Card>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dropdown menu with description" variant="faded">
            <DropdownSection showDivider title="Actions">
                <DropdownItem
                    key="new"
                    description="View the note in full screen"
                    startContent={<IconEye className={iconClasses}/>}
                >
                    View
                </DropdownItem>
                <DropdownItem
                    key="copy"
                    description="Copy the note link"
                    startContent={<IconCopy className={iconClasses}/>}
                >
                    Copy link
                </DropdownItem>
                <DropdownItem
                    key="edit"
                    description="Allows you to edit the note"
                    startContent={<IconEdit className={iconClasses}/>}
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
                    startContent={<IconTrash className={cn(iconClasses, "text-danger")}/>}
                >
                    Delete file
                </DropdownItem>
            </DropdownSection>
        </DropdownMenu>
    </Dropdown>
}