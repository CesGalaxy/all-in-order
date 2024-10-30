"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { IconChevronDown, IconTrash } from "@tabler/icons-react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Tooltip } from "@nextui-org/tooltip";

export interface SubjectOptionsButtonProps {
    subjectId: number;
    deleteAction: () => void;
}

function SubjectOptionsButton({ deleteAction }: SubjectOptionsButtonProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return <>
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly size="sm">
                    <IconChevronDown/>
                </Button>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownItem
                    startContent={<IconTrash/>}
                    key="delete"
                    color="danger"
                    onPress={onOpen}
                >
                    Delete subject
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>{(onClose) => <>
                <ModalHeader>Are you sure?</ModalHeader>
                <ModalBody>You cannot undo this action</ModalBody>
                <ModalFooter>
                    <Tooltip content="This will permanently delete this subject" placement="bottom">
                        <Button color="danger" variant="shadow" startContent={<IconTrash/>}
                                onPress={() => deleteAction()}>
                            Yes, delete
                        </Button>
                    </Tooltip>
                </ModalFooter>
            </>}</ModalContent>
        </Modal>
    </>
}

export default SubjectOptionsButton;
