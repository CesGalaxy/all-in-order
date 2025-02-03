"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@heroui/dropdown";
import { IconChevronDown, IconCopy, IconEdit, IconPin, IconTrash } from "@tabler/icons-react";
import { Button, ButtonGroup } from "@heroui/button";
import { useTranslations } from "next-intl";
import DeleteNoteModal from "@/collections/note/components/modals/DeleteNoteModal";
import { Modal, useDisclosure } from "@heroui/modal";
import { Link as TransitionLink } from "next-view-transitions";
import ModalButton from "@/components/utils/ModalButton";
import NoteModal from "@/collections/note/components/modals/NoteModal";

export default function NoteCardButtons({ subjectId, id }: { subjectId?: number, id: number }) {
    const t = useTranslations();

    const deleteDisclosure = useDisclosure();

    return <>
        <ButtonGroup>
            {subjectId
                ? <Button
                    as={TransitionLink}
                    href={`/subjects/${subjectId}/notes/${id}`}
                    size="sm"
                >
                    {t("Global.viewMore")}
                </Button>
                : <ModalButton
                    modal={<NoteModal/>}
                    href="#"
                    size="sm"
                    modalProps={{ size: "xl" }}
                >
                    {t("Global.viewMore")}
                </ModalButton>}
            <Dropdown>
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
                            onPress={deleteDisclosure.onOpen}
                        >
                            {t("Dash.Note.delete")}
                        </DropdownItem>
                    </DropdownSection>
                </DropdownMenu>
            </Dropdown>
        </ButtonGroup>
        <Modal isOpen={deleteDisclosure.isOpen} onOpenChange={deleteDisclosure.onOpenChange}>
            <DeleteNoteModal id={id} subjectId={subjectId}/>
        </Modal>
    </>
}