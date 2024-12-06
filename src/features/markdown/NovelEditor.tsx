"use client";

import "./styles.css";
import {
    EditorCommand,
    EditorCommandEmpty,
    EditorCommandItem,
    EditorCommandList,
    EditorContent,
    EditorRoot,
    JSONContent
} from "novel";
import { useState } from "react";
import { defaultExtensions } from "@/features/markdown/tiptap/extensions";
import { handleCommandNavigation } from "novel/extensions";
import { Button, ButtonGroup } from "@nextui-org/button";
import { IconChevronDown, IconChevronLeft, IconDeviceFloppy, IconDownload } from "@tabler/icons-react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { slashCommand, suggestionItems } from "@/features/markdown/tiptap/sugestions";
import { Input } from "@nextui-org/input";

export default function NovelEditor() {
    const [content, setContent] = useState<JSONContent>();

    return <EditorRoot>
        <EditorContent
            immediatelyRender={false}
            className="relative flex-grow w-full --max-w-screen-lg border-muted --bg-background
            bg-content2 rounded-t-3xl vt-name-[doc-e-wrapper] flex flex-col"
            initialContent={content}
            onUpdate={({ editor }) => {
                const json = editor.getJSON();
                setContent(json);
            }}
            extensions={[...defaultExtensions, slashCommand]}
            editorContainerProps={{
                className: "w-full h-full flex-grow flex flex-col",
            }}
            editorProps={{
                handleDOMEvents: {
                    keydown: (_view, event) => handleCommandNavigation(event),
                },
                attributes: {
                    class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full h-full flex-grow`,
                }
            }}
            slotBefore={
                <header className="flex items-center justify-between p-4 pb-8">
                    <nav className="flex gap-4 items-center">
                        <Button radius="full" isIconOnly variant="light">
                            <IconChevronLeft/>
                        </Button>
                        <Popover placement="bottom-start">
                            <PopoverTrigger>
                                <h2 className="text-3xl vt-name-[doc-name] hover:bg-content1 -mx-2 px-2 cursor-pointer rounded-full">
                                    {"docName"}
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
        >
            <EditorCommand
                className='z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all'>
                <EditorCommandEmpty className='px-2 text-muted-foreground'>No results</EditorCommandEmpty>
                <EditorCommandList>
                    {suggestionItems.map((item) => (
                        <EditorCommandItem
                            value={item.title}
                            onCommand={(val) => item.command?.(val)}
                            className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm
                            cursor-pointer transition-colors
                            hover:bg-content1 aria-selected:bg-content2"
                            key={item.title}>
                            <div
                                className='flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background'>
                                {item.icon}
                            </div>
                            <div>
                                <p className='font-medium'>{item.title}</p>
                                <p className='text-xs text-muted-foreground'>{item.description}</p>
                            </div>
                        </EditorCommandItem>
                    ))}
                </EditorCommandList>
            </EditorCommand>
        </EditorContent>
    </EditorRoot>;
}