"use client";

import { IconDeviceFloppy, IconEdit } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { SubjectNote } from "@/supabase/models/SubjectNote";
import { useState } from "react";
import { Input, Textarea } from "@nextui-org/input";
import { toast } from "react-toastify";

export default function EditButton({ note, action }: {
    note: SubjectNote,
    action: (title: string, content: string) => Promise<string | undefined>
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    return <>
        <Button startContent={<IconEdit/>} onPress={onOpen}>Edit note</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Edit note</ModalHeader>
                        <ModalBody>
                            <Input
                                autoFocus
                                label="Title"
                                placeholder="Untitled note"
                                variant="bordered"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Textarea
                                label="Content"
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
                                Close
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
                                Save
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    </>
}