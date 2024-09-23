"use client";

import { Link } from "@nextui-org/link";
import { Subject } from "@/supabase/models/Subject";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { useState } from "react";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { toast } from "react-toastify";

export default function EditSubjectButton({ subject, action }: {
    subject: Subject,
    action: (name?: string, description?: string) => Promise<string | undefined>
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [name, setName] = useState(subject.name);
    const [description, setDescription] = useState(subject.description);

    return <>
        <Link as={"button"} onPress={onOpen}>Edit subject</Link>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{subject.name}</ModalHeader>
                        <ModalBody>
                            <Input
                                autoFocus
                                label="Name"
                                placeholder="Enter the name of the subject"
                                variant="bordered"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Textarea
                                label="Description"
                                placeholder="Enter a description for the subject"
                                variant="bordered"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button
                                color="primary"
                                onPress={async () => {
                                    const error = await action(name, description);

                                    if (error) {
                                        toast(error, { type: "error" })
                                    } else {
                                        toast("Subject updated successfully!", { type: "success" });
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
    </>;
}