"use client";

import { Button, ButtonGroup } from "@nextui-org/button";
import { IconArrowBack, IconMenu } from "@tabler/icons-react";
import { Link } from "@nextui-org/link";
import { BreadcrumbItem, BreadcrumbItemProps, Breadcrumbs } from "@nextui-org/breadcrumbs";

export interface ExplorerNavigationProps {
    backButton?: {
        label: string;
        href: string;
    },
    breadcrumbs: BreadcrumbItemProps[],
}

export default function ExplorerNavigation({ backButton, breadcrumbs }: ExplorerNavigationProps) {
    return <header className="h-8 w-full flex items-center justify-between border-b border-b-divider">
        <nav className="flex items-center h-8 gap-2">
            <ButtonGroup as="section" className="h-8 w-64 border-r border-r-divider">
                <Button
                    as={Link}
                    href="/app"
                    size="sm"
                    radius="none"
                    isIconOnly
                >
                    <IconMenu/>
                </Button>
                <Button
                    as={Link}
                    href={backButton ? backButton.href : "#"}
                    startContent={backButton && <IconArrowBack/>}
                    size="sm"
                    radius="none"
                    className="flex-grow"
                    variant="light"
                    isDisabled={!backButton}
                >
                    {backButton ? backButton.label : ""}
                </Button>
            </ButtonGroup>
            <Breadcrumbs>
                {breadcrumbs.map((breadcrumb, index) => (
                    <BreadcrumbItem key={index} {...breadcrumb}/>
                ))}
            </Breadcrumbs>
        </nav>
        <nav className="flex items-center"></nav>
    </header>
}