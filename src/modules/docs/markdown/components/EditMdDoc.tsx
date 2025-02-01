"use client";

import { defaultValueCtx, Editor, editorViewOptionsCtx, rootAttrsCtx, rootCtx } from "@milkdown/kit/core";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import { commonmark } from '@milkdown/kit/preset/commonmark';
import '@milkdown/kit/prose/view/style/prosemirror.css'
import "@milkdown/kit/prose/tables/style/tables.css";
import "@/modules/docs/markdown/styles/MDDocEditor.css";
import { Navbar, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Input } from "@heroui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import DocTypeIcon from "@/modules/docs/app/components/DocTypeIcon";
import { Alert } from "@heroui/alert";
import { Button, ButtonGroup } from "@heroui/button";
import { IconChevronDown, IconDeviceFloppy } from "@tabler/icons-react";
import useDocEditor from "@/modules/docs/app/reactivity/hooks/useDocEditor";
import placeholderPlugin from "@/modules/docs/markdown/plugins/placeholder";
import { listener, listenerCtx } from '@milkdown/kit/plugin/listener';

export default function EditMdDoc() {
    const { name, save } = useDocEditor();

    return <MilkdownProvider>
        <div className="border-l border-l-divider w-full grow z-50">
            <Navbar isBordered shouldHideOnScroll isBlurred={false} maxWidth="full">
                <NavbarContent>
                    <NavbarItem>
                        <Popover>
                            <PopoverTrigger>
                                <Input
                                    value={name}
                                    isReadOnly
                                    className="w-fit"
                                    variant="faded"
                                    endContent={<DocTypeIcon.md size={32}/>}
                                />
                            </PopoverTrigger>
                            <PopoverContent>
                                <Alert color="danger" title="Error!">
                                    You cannot rename this document!
                                </Alert>
                            </PopoverContent>
                        </Popover>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <ButtonGroup as={NavbarItem} color="primary">
                        <Button startContent={<IconDeviceFloppy/>} onPress={() => save(true)}>Save</Button>
                        <Button isIconOnly><IconChevronDown/></Button>
                    </ButtonGroup>
                </NavbarContent>
            </Navbar>
            <MilkdownEditor/>
        </div>
    </MilkdownProvider>;
}

const MilkdownEditor: React.FC = () => {
    const { initialContent, updateContent } = useDocEditor();

    const _state = useEditor(root =>
        Editor.make()
            // .config(nord)
            .config(ctx => {
                ctx.set(rootCtx, root);

                ctx.update(rootAttrsCtx, prev => ({ ...prev, class: 'milkdown', }));

                ctx.update(editorViewOptionsCtx, prev => ({
                    ...prev,
                    attributes: { class: 'milkdown-theme-my-theme', },
                }))

                ctx.set(defaultValueCtx, initialContent || "");

                ctx.get(listenerCtx).markdownUpdated((ctx, markdown, prevMarkdown) => {
                    updateContent(markdown);
                });
            })
            .use(placeholderPlugin)
            .use(commonmark)
            .use(listener)
    );

    return <Milkdown/>;
};