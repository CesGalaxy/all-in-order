"use client";

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { IconPlus } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

function CreateTopicButton({ createTopicAction }: {
    createTopicAction: (title: string, description: string) => Promise<string>
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [name, setname] = useState("");
    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(false);

    const validateName = () => {
        if (!name) return "Name is required";
        if (name.length < 3) return "Name is too short";
        if (name.length > 64) return "Name is too long";
    }

    const validateDescription = () => description.length > 512 ? "Description is too long" : undefined;

    const isNameValid = useMemo(validateName, [name]);
    const isDescriptionInvalid = useMemo(validateDescription, [description]);

    const isValid = !isNameValid && !isDescriptionInvalid;

    return (
        <>
            <Button onPress={onOpen} color="primary">Create a topic</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Create a new topic</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Name"
                                    placeholder="Enter the name of the topic"
                                    variant="bordered"
                                    isRequired
                                    validate={validateName}
                                    value={name}
                                    onChange={e => setname(e.target.value)}
                                />
                                <Textarea
                                    label="Description"
                                    placeholder="A description for the topic (optional)"
                                    variant="bordered"
                                    rows={3}
                                    maxLength={512}
                                    validate={validateDescription}
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={onClose}
                                    startContent={<IconPlus/>}
                                    isDisabled={!isValid}
                                    isLoading={loading}
                                    onClick={async () => {
                                        setLoading(true);
                                        const error = await createTopicAction(name, description);
                                        setLoading(false);

                                        if (error) toast(error, { type: "error" });
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

export default CreateTopicButton;