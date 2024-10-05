"use client";

import { useState } from "react";
import { ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { IconPlus } from "@tabler/icons-react";
import { toast } from "react-toastify";

export default function CreateNoteModal({ action }: {
    action: (title: string, content: string) => Promise<string | undefined>
}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [loading, setLoading] = useState(false);

    return <ModalContent>
        {(onClose) => (
            <>
                <ModalHeader>Create a new note</ModalHeader>
                <ModalBody>
                    <Input
                        autoFocus
                        label="Title"
                        placeholder="Enter the title of the note (optional)"
                        variant="bordered"
                        value={title}
                        onValueChange={setTitle}
                    />
                    <Textarea
                        label="Content"
                        placeholder="Start typing here..."
                        variant="bordered"
                        rows={3}
                        maxLength={512}
                        value={content}
                        isRequired
                        onValueChange={setContent}
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
    </ModalContent>;
}