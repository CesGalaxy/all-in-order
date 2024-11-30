"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/dropdown";
import { IconDatabaseImport, IconDots, IconDownload, IconEdit, IconShare, IconTrash } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";
import { cn } from "@nextui-org/theme";
import { Modal, useDisclosure } from "@nextui-org/modal";
import DeleteSubjectModal from "@/collections/subject/components/modals/DeleteSubjectModal";

const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

export default function SubjectSidebarDropdown({ subjectId }: { subjectId: number }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return <Dropdown placement="right">
        <DropdownTrigger>
            <Button isIconOnly variant="faded" className="!rounded-l-none">
                <IconDots/>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <DeleteSubjectModal action={subjectId}/>
                </Modal>
            </Button>
        </DropdownTrigger>
        <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
            <DropdownSection title="Storage" showDivider>
                <DropdownItem
                    key="import"
                    description="Import a new topic"
                    startContent={<IconDatabaseImport className={iconClasses}/>}
                >
                    Import topic
                </DropdownItem>
                <DropdownItem
                    key="export"
                    description="Download the subject data"
                    startContent={<IconDownload className={iconClasses}/>}
                >
                    Download subject
                </DropdownItem>
            </DropdownSection>
            <DropdownSection title="Actions" showDivider>
                <DropdownItem
                    key="share"
                    description="Share the subject"
                    startContent={<IconShare className={iconClasses}/>}
                >
                    Share subject
                </DropdownItem>
                <DropdownItem
                    key="edit"
                    description="Allows you to edit the subject"
                    startContent={<IconEdit className={iconClasses}/>}
                >
                    Edit subject
                </DropdownItem>
            </DropdownSection>
            <DropdownSection title="Danger zone">
                <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    description="Permanently delete the subject"
                    startContent={<IconTrash className={cn(iconClasses, "text-danger")}/>}
                    onPress={onOpen}
                >
                    Delete subject
                </DropdownItem>
            </DropdownSection>
        </DropdownMenu>
    </Dropdown>;
}