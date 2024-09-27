"use client";

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "react-toastify";

function CreateNoteButton({ action }: {
    action: (title: string, content: string) => Promise<string | undefined>
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [loading, setLoading] = useState(false);

    return (
        <>
            <Button onPress={onOpen} color="primary">Create a note</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Create a new note</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Title"
                                    placeholder="Enter the title of the note (optional)"
                                    variant="bordered"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                                <Textarea
                                    label="Content"
                                    placeholder="Start typing here..."
                                    variant="bordered"
                                    rows={3}
                                    maxLength={512}
                                    value={content}
                                    isRequired
                                    onChange={e => setContent(e.target.value)}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    color="primary"
                                    startContent={<IconPlus/>}
                                    isDisabled={loading || !content}
                                    isLoading={loading}
                                    onPress={async () => {
                                        setLoading(true);
                                        const error = await action(title, content);
                                        setLoading(false);

                                        if (error) {
                                            toast(error, { type: "error" });
                                        } else {
                                            toast("Note created successfully!", { type: "success" });
                                            onClose();
                                        }
                                    }}
                                >
                                    Create
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default CreateNoteButton;