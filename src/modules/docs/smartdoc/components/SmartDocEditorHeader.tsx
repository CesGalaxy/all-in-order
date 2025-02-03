"use client";

import { Button, ButtonGroup } from "@heroui/button";
import { IconChevronDown, IconChevronLeft, IconDeviceFloppy, IconDownload } from "@tabler/icons-react";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { Input } from "@heroui/input";
import { Tab, Tabs } from "@heroui/tabs";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import useDocEditor from "@/modules/docs/app/reactivity/hooks/useDocEditor";

export default function SmartDocEditorHeader() {
    const { name } = useDocEditor();

    return <header
        className="flex items-center justify-between p-3 mb-4 sticky top-0 backdrop-blur bg-content3/75 --rounded-t-3xl z-10">
        <nav className="flex gap-4 items-center">
            <Button radius="full" isIconOnly variant="light">
                <IconChevronLeft/>
            </Button>
            <Popover placement="bottom-start">
                <PopoverTrigger>
                    <h2 className="text-3xl vt-name-[doc-name] hover:bg-content1 -mx-2 px-4 cursor-pointer rounded-full">
                        {name}
                    </h2>
                </PopoverTrigger>
                <PopoverContent className="min-w-96 py-3 gap-4">
                    <Input type="text" placeholder="Enter the doc name here" label="Name"/>
                    <nav className="flex items-center gap-4 justify-end w-full">
                        <Button color="warning" variant="flat">
                            Transfer ownership
                        </Button>
                        <Button color="primary">
                            Rename
                        </Button>
                    </nav>
                </PopoverContent>
            </Popover>
        </nav>
        <nav className="flex items-center gap-4">
            <ButtonGroup>
                <Popover>
                    <PopoverTrigger>
                        <Button variant="flat" isIconOnly>
                            <IconDownload/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <Tabs>
                            <Tab key="pdf" title="PDF">Hi</Tab>
                            <Tab key="png" title="PNG">Hi</Tab>
                            <Tab key="svg" title="SVG">Hi</Tab>
                            <Tab key="html" title="HTML">G</Tab>
                        </Tabs>
                    </PopoverContent>
                </Popover>
            </ButtonGroup>
            <ButtonGroup>
                <Button color="primary" startContent={<IconDeviceFloppy/>}>
                    Save
                </Button>
                <Dropdown>
                    <DropdownTrigger>
                        <Button color="primary" isIconOnly>
                            <IconChevronDown/>
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu variant="flat" aria-label="Dropdown menu with shortcut">
                        <DropdownItem key="copy" shortcut="CTRL+SHIFT+S">Save as</DropdownItem>
                        <DropdownItem key="new" shortcut="CTRL+D">Download</DropdownItem>
                        <DropdownItem key="edit" shortcut="CTRL+P">Print</DropdownItem>
                        <DropdownItem key="delete" className="text-danger" color="danger">
                            Exit without saving
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </ButtonGroup>
        </nav>
    </header>
}