"use client";

import { Button, ButtonGroup } from "@nextui-org/button";
import {
    IconAt,
    IconBold,
    IconChevronLeft,
    IconHeading,
    IconItalic, IconLayoutGrid, IconLink,
    IconList,
    IconListCheck,
    IconListNumbers, IconMoodSmile, IconPhoto, IconQuote
} from "@tabler/icons-react";
import { useState } from "react";
import { Converter } from "showdown";

export interface MDEditorProps {
    docName: string;
    initialContent?: string;
}

export default function MDEditor({ docName, initialContent }: MDEditorProps) {
    const [content, setContent] = useState<string>(initialContent ?? "");
    const converter = new Converter({
        tasklists: true,
        simplifiedAutoLink: true,
    });
    const html = converter.makeHtml(content);

    return <div className="w-full h-full flex flex-col items-stretch justify-stretch bg-content2 text-content2-foreground rounded-t-3xl p-4 gap-4">
        <header className="flex items-center justify-between">
            <nav className="flex gap-4 items-center">
                <Button radius="full" isIconOnly variant="light">
                    <IconChevronLeft/>
                </Button>
                <h2 className="text-3xl">{docName}</h2>
            </nav>
            <nav>
                <Button>Hello</Button>
            </nav>
        </header>
        <div className="flex-grow grid grid-cols-2 bg-content3 text-content3-foreground rounded-3xl divide-x divide-divider">
            <div>
                <textarea
                    className="w-full h-full px-4 py-8 bg-transparent text-content3-foreground outline-none"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <div
                className="revert-tailwind-only-child px-4 w-full h-full"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
        <footer className="bg-content3 rounded-full flex items-center gap-4">
            <ButtonGroup>
                <Button radius="full" isIconOnly>
                    <IconBold />
                </Button>
                <Button isIconOnly>
                    <IconItalic />
                </Button>
                <Button isIconOnly>
                    <IconHeading />
                </Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button isIconOnly>
                    <IconList />
                </Button>
                <Button isIconOnly>
                    <IconListNumbers />
                </Button>
                <Button isIconOnly>
                    <IconListCheck />
                </Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button isIconOnly>
                    <IconLink />
                </Button>
                <Button isIconOnly>
                    <IconPhoto />
                </Button>
                <Button isIconOnly>
                    <IconAt />
                </Button>
                <Button isIconOnly>
                    <IconMoodSmile />
                </Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button isIconOnly>
                    <IconLayoutGrid />
                </Button>
                <Button isIconOnly>
                    <IconQuote />
                </Button>
            </ButtonGroup>
        </footer>
    </div>;
}