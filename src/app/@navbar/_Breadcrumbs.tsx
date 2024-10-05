"use client";

import { BreadcrumbItem, BreadcrumbItemProps, Breadcrumbs } from "@nextui-org/breadcrumbs";
import type { ReactNode } from "react";
import { Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { IconDotsCircleHorizontal } from "@tabler/icons-react";

export default function NavbarBreadcrumbs({ items, actions }: { items: BreadcrumbItemProps[], actions?: ReactNode }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    // The items' children are passed separately due to an error with the IDE linter
    return <nav className="max-w-[1024px] flex items-center justify-between mx-2 sm:mx-8 lg:mx-auto relative gap-8">
        <Breadcrumbs className="flex-grow pr-10 md:pr-0">
            {items.map(({ children, ...itemProps }, index) => <BreadcrumbItem
                key={index} {...itemProps}>{children}</BreadcrumbItem>)}
        </Breadcrumbs>
        {actions && <>
            <nav className="items-center gap-8 hidden md:flex">{actions}</nav>
            <Button isIconOnly className="absolute top-0 right-0 md:hidden" onPress={onOpen}>
                <IconDotsCircleHorizontal/>
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
                <ModalContent>
                    {(onClose) => <ModalBody as={"nav"} className="flex flex-col gap-4 py-6">{actions}</ModalBody>}
                </ModalContent>
            </Modal>
        </>}
    </nav>;
}