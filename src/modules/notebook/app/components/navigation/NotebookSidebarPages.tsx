"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { IconDots, IconFile, IconFilePlus, IconLoader, IconTool, IconTrash, IconWriting } from "@tabler/icons-react";
import { Button } from "@heroui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { Input } from "@heroui/input";
import useNotebook from "@/modules/notebook/app/reactivity/hooks/useNotebook";
import ErrorListView from "@/components/views/ErrorListView";
import { Link } from "@heroui/link";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@heroui/dropdown";
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

        return (
            <AccordionItem
                key={page.id}
                title={<Link href={`/topics/${topicId}/notebook/${page.name.replace(/\.json$/, "")}`} underline="hover"
                             color="foreground">
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
                                <DropdownItem key="rename" startContent={<IconWriting/>}>Rename</DropdownItem>
                                <DropdownItem key="props" startContent={<IconTool/>}>Properties</DropdownItem>
                            </DropdownSection>
                            <DropdownSection>
                                <DropdownItem key="delete" startContent={<IconTrash/>} color="danger"
                                              onPress={() => deletePage(page.name)}>Delete</DropdownItem>
                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>
                </div>}
            >
                <Button className="w-full" size="sm" startContent={<IconFilePlus/>} radius="full" variant="flat" isDisabled>
                    Add subpage
                </Button>
            </AccordionItem>
        );
    }, [deletePage, topicId]);

    return <div className="w-full md:w-auto md:min-w-48 md:max-w-96 py-2 h-full flex flex-col">
        <header className="mb-2 px-2 flex items-center justify-between">
            <Link href={`/topics/${topicId}/notebook`} color="foreground" size="lg" className="font-medium">
                <h1>Notebook</h1>
            </Link>
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
                            autoFocus
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
        <nav className="flex-grow">
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
        <footer className="w-full px-2 flex">
            <Input
                placeholder="Search..."
                className="w-min flex-grow"
                radius="full"
                variant="faded"
                size="sm"
            />
        </footer>
    </div>
}