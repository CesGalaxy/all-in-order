"use client";

import { IconTrash } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";

export default function AYSButton() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return <>
        <Button
            color="danger"
            variant="shadow"
            className="w-full"
            startContent={<IconTrash/>}
            onPress={onOpen}
        >
            Yes, delete the practice
        </Button>
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Are you sure?</ModalHeader>
                        <ModalBody>
                            <p>This cannot be undone!</p>
                        </ModalBody>
                        <ModalFooter>
                            <Popover backdrop="opaque">
                                <PopoverTrigger>
                                    <Button
                                        color="danger"
                                        size="lg"
                                        variant="shadow"
                                        startContent={<IconTrash/>}
                                    >
                                        I&apos;m sure, delete the practice
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    {(titleProps) => <div className="p-4">
                                        <h3 className="text-lg font-bold text-center" {...titleProps}>
                                            Confirm action
                                        </h3>
                                        <br/>
                                        <Button
                                            color="danger"
                                            variant="shadow"
                                            className="w-full"
                                            onPress={onClose}
                                            startContent={<IconTrash/>}
                                        >
                                            Delete
                                        </Button>
                                    </div>}
                                </PopoverContent>
                            </Popover>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    </>;
}