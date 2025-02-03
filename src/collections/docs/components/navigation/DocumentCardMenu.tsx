"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@heroui/dropdown";
import { Button, ButtonGroupProvider } from "@heroui/button";
import { IconCopy, IconCopyCheck, IconDots, IconEdit, IconShare, IconTool, IconTrash } from "@tabler/icons-react";
import { DeleteDocModal } from "@/collections/docs/components/modals";
import { Modal, useDisclosure } from "@heroui/modal";

export default function DocumentCardMenu({ topicId, path }: { topicId: number, path: string }) {
    const deleteDisclosure = useDisclosure();

    return <>
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly>
                    <IconDots/>
                </Button>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownSection title="Actions" showDivider>
                    <DropdownItem
                        key="new"
                        startContent={<IconEdit/>}
                    >
                        Edit file
                    </DropdownItem>
                    <DropdownItem
                        key="edit"
                        startContent={<IconCopyCheck/>}
                    >
                        Duplicate
                    </DropdownItem>
                    <DropdownItem
                        key="props"
                        startContent={<IconTool/>}
                    >
                        Properties
                    </DropdownItem>
                </DropdownSection>
                <DropdownSection title="Share" showDivider>
                    <DropdownItem
                        key="copy"
                        startContent={<IconCopy/>}
                    >
                        Copy link
                    </DropdownItem>
                    <DropdownItem
                        key="share"
                        startContent={<IconShare/>}
                    >
                        Share
                    </DropdownItem>
                </DropdownSection>
                <DropdownSection title="Danger zone">
                    <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        startContent={<IconTrash/>}
                        onPress={deleteDisclosure.onOpen}
                    >
                        Delete file
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
        <ButtonGroupProvider value={null as any}>
            <Modal isOpen={deleteDisclosure.isOpen} onClose={deleteDisclosure.onClose}>
                <DeleteDocModal name="" path={path} topicId={topicId}/>
            </Modal>
        </ButtonGroupProvider>
    </>
}