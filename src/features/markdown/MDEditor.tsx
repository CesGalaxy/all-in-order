"use client";

import { Button, ButtonGroup } from "@nextui-org/button";
import {
    IconAt,
    IconBold,
    IconChevronDown,
    IconChevronLeft,
    IconDeviceFloppy,
    IconDownload,
    IconEdit,
    IconEye,
    IconHeading,
    IconItalic,
    IconLayoutGrid,
    IconLink,
    IconList,
    IconListCheck,
    IconListNumbers,
    IconMaximize,
    IconMoodSmile,
    IconPhoto,
    IconQuote
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Converter } from "showdown";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { toast } from "react-toastify";
import { useTransitionRouter } from "next-view-transitions";

export interface MDEditorProps {
    docName: string;
    initialContent?: string;
    saveContent?: (content: string) => Promise<boolean>;
}

export default function MDEditor({ docName, initialContent, saveContent }: MDEditorProps) {
    const router = useTransitionRouter();

    const [content, setContent] = useState<string>(initialContent ?? "");

    const converter = new Converter({
        tasklists: true,
        simplifiedAutoLink: true,
        strikethrough: true,
    });

    const html = converter.makeHtml(content);

    // Prevent the user from accidentally closing/refreshing the page
    useEffect(() => {
        const unloadCallback = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = "";
            return "";
        };

        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
    }, []);

    useEffect(() => {
        // Save the content every minute
        const saveInterval = setInterval(() => saveContent?.(content), 1000 * 60);

        return () => clearInterval(saveInterval);
    }, [content, saveContent]);

    const save = () => saveContent?.(content).then(success => success
        ? toast("Saved successfully!", { type: "success" })
        : toast("Failed to save!", { type: "error" })
    ).catch(error => {
        console.error(error);
        toast("Failed to save!", { type: "error" });
    });

    return <div
        className="w-full h-full flex flex-col items-stretch justify-stretch bg-content2 text-content2-foreground rounded-t-3xl p-4 gap-4 vt-name-[doc-e-wrapper]">
        <header className="flex items-center justify-between">
            <nav className="flex gap-4 items-center">
                <Button radius="full" isIconOnly variant="light" onPress={() => router.back()}>
                    <IconChevronLeft/>
                </Button>
                <h2 className="text-3xl vt-name-[doc-name]">{docName}</h2>
            </nav>
            <nav className="flex items-center gap-4">
                <ButtonGroup>
                    <Button variant="flat" isIconOnly>
                        <IconDownload/>
                    </Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button color="primary" startContent={<IconDeviceFloppy/>} onPress={save}>
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
        <div
            className="h-full flex-grow grid grid-cols-2 bg-content3 text-content3-foreground rounded-3xl divide-x divide-divider min-h-0">
            <form className="w-full h-full" action="">
                <textarea
                    className="w-full h-full px-4 py-8 bg-transparent text-content3-foreground outline-none m-0"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    name="content"
                />
            </form>
            <div className="w-full h-full overflow-auto revert-tailwind-only-child px-4 vt-name-[doc-content]"
                 dangerouslySetInnerHTML={{ __html: html }}/>
        </div>
        <footer className="bg-content3 rounded-full flex items-center justify-between">
            <nav className="flex items-center gap-4">
                <ButtonGroup>
                    <Button radius="full" isIconOnly>
                        <IconBold/>
                    </Button>
                    <Button isIconOnly>
                        <IconItalic/>
                    </Button>
                    <Button isIconOnly>
                        <IconHeading/>
                    </Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button isIconOnly>
                        <IconList/>
                    </Button>
                    <Button isIconOnly>
                        <IconListNumbers/>
                    </Button>
                    <Button isIconOnly>
                        <IconListCheck/>
                    </Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button isIconOnly>
                        <IconLink/>
                    </Button>
                    <Button isIconOnly>
                        <IconPhoto/>
                    </Button>
                    <Button isIconOnly>
                        <IconAt/>
                    </Button>
                    <Button isIconOnly>
                        <IconMoodSmile/>
                    </Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button isIconOnly>
                        <IconLayoutGrid/>
                    </Button>
                    <Button isIconOnly>
                        <IconQuote/>
                    </Button>
                </ButtonGroup>
            </nav>
            <nav className="flex items-center gap-4">
                <ButtonGroup>
                    <Button isIconOnly>
                        <IconEdit/>
                    </Button>
                    <Button isIconOnly>
                        <IconEye/>
                    </Button>
                    <Button radius="full" isIconOnly>
                        <IconMaximize/>
                    </Button>
                </ButtonGroup>
            </nav>
        </footer>
    </div>;
}