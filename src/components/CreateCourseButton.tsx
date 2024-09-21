"use client";

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { IconPlus } from "@tabler/icons-react";

export default function CreateCourseButton() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} color="primary">Create a course</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Create a new course</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Name"
                                    placeholder="Enter the name of the course"
                                    variant="bordered"
                                    isRequired
                                    validate={value => {
                                        if (!value) return "Name is required";
                                        if (value.length < 3) return "Name is too short";
                                        if (value.length > 64) return "Name is too long";
                                    }}
                                />
                                <Textarea
                                    label="Description"
                                    placeholder="A description for the course (optional)"
                                    variant="bordered"
                                    rows={3}
                                    maxLength={512}
                                    
                                />
                                <div className="flex py-2 px-1 justify-between">
                                    {/*<Checkbox*/}
                                    {/*    classNames={{*/}
                                    {/*        label: "text-small",*/}
                                    {/*    }}*/}
                                    {/*>*/}
                                    {/*    Remember me*/}
                                    {/*</Checkbox>*/}
                                    <Link color="primary" href="#" size="sm">
                                        Already have a code?
                                    </Link>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={onClose} startContent={<IconPlus/>}>
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