"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { IconDots, IconFile, IconFilePlus, IconLoader, IconTool, IconTrash, IconWriting } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Input } from "@nextui-org/input";
import useNotebook from "@/app/topics/[topicId]/notebook/_feature/reactivity/hooks/useNotebook";
import ErrorListView from "@/components/views/ErrorListView";
import { Link } from "@nextui-org/link";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/dropdown";
import { FileObject } from "@supabase/storage-js";
import { useCallback } from "react";

export default function NotebookSidebarPages() {
    const {
        pages,
        optimisticPage,
        refreshingPages,
        createPage,
        createPageState,
        isCreatingPage,
        deletePage,
        topicId
    } = useNotebook();

    const pageNavigation = useCallback((page: FileObject) => {
        const name = atob(page.name.replace(/\.json$/, ""));

        return <AccordionItem
            key={page.id}
            title={<Link href={`/topics/${topicId}/notebook/${page.id}`} underline="hover" color="foreground">
                {name}
            </Link>}
            textValue={name}
            classNames={{ heading: "group" }}
            startContent={<div>
                <Dropdown>
                    <DropdownTrigger>
                        <div role="button">
                            <IconFile className="group-hover:hidden"/>
                            <IconDots
                                className="hidden group-hover:block bg-content3 hover:bg-content4 rounded-full"/>
                        </div>
                    </DropdownTrigger>
                    <DropdownMenu>
                        <DropdownSection showDivider>
                            <DropdownItem startContent={<IconWriting/>}>Rename</DropdownItem>
                            <DropdownItem startContent={<IconTool/>}>Properties</DropdownItem>
                        </DropdownSection>
                        <DropdownSection>
                            <DropdownItem startContent={<IconTrash/>} color="danger"
                                          onPress={() => deletePage(page.name)}>Delete</DropdownItem>
                        </DropdownSection>
                    </DropdownMenu>
                </Dropdown>
            </div>}
        >
            <Button className="w-full" size="sm" startContent={<IconFilePlus/>} radius="full" variant="flat" isDisabled>
                Add subpage
            </Button>
        </AccordionItem>;
    }, [deletePage, topicId]);

    return <div className="min-w-48 max-w-96 py-2">
        <header className="mb-2 px-2 flex items-center justify-between font-medium text-lg">
            <h1>Notebook</h1>
            <Popover placement="bottom-start">
                <PopoverTrigger>
                    <Button size="sm" isIconOnly isLoading={refreshingPages || isCreatingPage || !!optimisticPage}>
                        <IconFilePlus size={20}/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="py-3 items-stretch gap-2">
                    <form className="flex items-center gap-4" action={createPage}>
                        <Input
                            name="aio-nb-page-name"
                            placeholder="Page name"
                            aria-label="Page name"
                            autoComplete="off"
                            startContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">Notebook/</span>
                                </div>
                            }
                        />
                        <Button type="submit" isLoading={refreshingPages || isCreatingPage || !!optimisticPage}>
                            Create
                        </Button>
                    </form>
                    {createPageState && !createPageState.ok &&
                        <ErrorListView errors={createPageState.errors}/>}
                </PopoverContent>
            </Popover>
        </header>
        <nav>
            <Accordion isCompact>
                {[
                    optimisticPage && <AccordionItem
                        key="optimistic"
                        title={optimisticPage}
                        classNames={{ heading: "group" }}
                        startContent={<IconLoader className="animate-spin"/>}
                    /> as any,
                    ...pages.map(page => pageNavigation(page))
                ]}
            </Accordion>
        </nav>
    </div>
}