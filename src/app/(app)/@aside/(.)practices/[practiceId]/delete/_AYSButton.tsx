"use client";

import { IconTrash } from "@tabler/icons-react";
import { Button } from "@heroui/button";
import { ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import ModalButton from "@/components/utils/ModalButton";

export default function AYSButton() {
    return <ModalButton
        color="danger"
        variant="shadow"
        className="w-full"
        startContent={<IconTrash/>}
        modal={<ModalContent>
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
        </ModalContent>}
    >
        Yes, delete the practice
    </ModalButton>;
}