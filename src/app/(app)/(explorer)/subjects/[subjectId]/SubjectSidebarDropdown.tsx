"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@heroui/dropdown";
import { IconDatabaseImport, IconDots, IconDownload, IconEdit, IconShare, IconTrash } from "@tabler/icons-react";
import { Button } from "@heroui/button";
import { cn } from "@heroui/theme";
import { Modal, useDisclosure } from "@heroui/modal";
import DeleteSubjectModal from "@/collections/subject/components/modals/DeleteSubjectModal";
import { useTranslations } from "next-intl";

const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

export default function SubjectSidebarDropdown({ subjectId }: { subjectId: number }) {
    const t = useTranslations();
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
            <DropdownSection title={t("Global.storage")} showDivider>
                <DropdownItem
                    key="import"
                    description={t("Dash.Topic.import_desc")}
                    startContent={<IconDatabaseImport className={iconClasses}/>}
                >
                    {t("Dash.Topic.import")}
                </DropdownItem>
                <DropdownItem
                    key="export"
                    description={t("Dash.Subject.download_desc")}
                    startContent={<IconDownload className={iconClasses}/>}
                >
                    {t("Dash.Subject.download")}
                </DropdownItem>
            </DropdownSection>
            <DropdownSection title={t("Global.actions")} showDivider>
                <DropdownItem
                    key="share"
                    description={t("Dash.Subject.share_desc")}
                    startContent={<IconShare className={iconClasses}/>}
                >
                    {t("Dash.Subject.share")}
                </DropdownItem>
                <DropdownItem
                    key="edit"
                    description={t("Dash.Subject.edit_desc")}
                    startContent={<IconEdit className={iconClasses}/>}
                >
                    {t("Dash.Subject.edit")}
                </DropdownItem>
            </DropdownSection>
            <DropdownSection title={t("Global.danger_zone")}>
                <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    description={t("Dash.Subject.delete_desc")}
                    startContent={<IconTrash className={cn(iconClasses, "text-danger")}/>}
                    onPress={onOpen}
                >
                    {t("Dash.Subject.delete")}
                </DropdownItem>
            </DropdownSection>
        </DropdownMenu>
    </Dropdown>;
}