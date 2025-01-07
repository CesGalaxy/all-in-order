"use client";

import { IconDeviceFloppy, IconEdit } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { useState } from "react";
import { Input, Textarea } from "@nextui-org/input";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { SubjectNote } from "@/supabase/entities";

export type RequiredSubjectNote = Pick<SubjectNote, "title" | "content">

function EditButton({ note, action }: {
    note: RequiredSubjectNote,
    action: (title: string, content: string) => Promise<string | undefined>
}) {
    const t = useTranslations();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    return <>
        <Button startContent={<IconEdit/>} onPress={onOpen}>{t('Dash.Note.edit')}</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{t('Dash.Note.edit')}</ModalHeader>
                        <ModalBody>
                            <Input
                                autoFocus
                                label={t("Global.title")}
                                placeholder={t("Dash.Note.untitled")}
                                variant="bordered"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Textarea
                                label={t("Global.content")}
                                placeholder="Start typing your ideas here..."
                                variant="bordered"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                maxRows={20}
                                minRows={5}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                {t('Global.cancel')}
                            </Button>
                            <Button
                                color="primary"
                                onPress={async () => {
                                    const error = await action(title, content);

                                    if (error) {
                                        toast(error, { type: "error" });
                                    } else {
                                        toast("Note updated successfully!", { type: "success" });
                                        onClose();
                                    }
                                }}
                                startContent={<IconDeviceFloppy/>}
                            >
                                {t('Global.save')}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    </>
}

export default EditButton;