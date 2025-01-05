"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/dropdown";
import { IconChevronDown, IconCopy, IconEdit, IconPin, IconTrash } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";
import { useTranslations } from "next-intl";

export default function NoteOptions() {
    const t = useTranslations();

    return <Dropdown>
        <DropdownTrigger>
            <Button isIconOnly size="sm">
                <IconChevronDown/>
            </Button>
        </DropdownTrigger>
        <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
            <DropdownSection title="Actions" showDivider>
                <DropdownItem
                    key="new"
                    description={t("Dash.Note.options.pin_description")}
                    startContent={<IconPin/>}
                >
                    {t("Dash.Note.options.pin")}
                </DropdownItem>
                <DropdownItem
                    key="copy"
                    description={t("Global.copy_link_description")}
                    startContent={<IconCopy/>}
                >
                    {t("Global.copy_link")}
                </DropdownItem>
                <DropdownItem
                    key="edit"
                    description={t("Dash.Note.edit_description")}
                    startContent={<IconEdit/>}
                >
                    {t("Dash.Note.edit")}
                </DropdownItem>
            </DropdownSection>
            <DropdownSection title="Danger zone">
                <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    description={t("Dash.Note.delete_description")}
                    startContent={<IconTrash/>}
                >
                    {t("Dash.Note.delete")}
                </DropdownItem>
            </DropdownSection>
        </DropdownMenu>
    </Dropdown>
}