"use client";

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { IconPlus } from "@tabler/icons-react";

export default function JoinCourseButton() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen}>Join with code</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Join a course</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Code"
                                    placeholder="Enter the code of the course"
                                    variant="bordered"
                                    isRequired
                                    size="lg"
                                    validate={value => {
                                        if (!value) return "Code is required";
                                        if (value.length !== 8) return "Code must be 8 characters long";
                                        if (!/^[0-9a-fA-F]+$/.test(value)) return "Must be a valid code";
                                    }}
                                    onInput={(e: any) => e.target.value = e.target.value.toUpperCase()}
                                    inputMode="text"
                                    autoCapitalize="characters"
                                    autoCorrect="off"
                                    spellCheck="false"
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={onClose} startContent={<IconPlus/>}>
                                    Join
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}