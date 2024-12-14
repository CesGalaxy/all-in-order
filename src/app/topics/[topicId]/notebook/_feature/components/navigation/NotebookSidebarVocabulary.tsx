"use client";

import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { IconFolderPlus, IconPencilPlus, IconTextPlus } from "@tabler/icons-react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Tooltip } from "@nextui-org/tooltip";
import useNotebook from "@/app/topics/[topicId]/notebook/_feature/reactivity/hooks/useNotebook";
import useNotebookVocabulary from "@/app/topics/[topicId]/notebook/_feature/reactivity/hooks/useNotebookVocabulary";

export default function NotebookSidebarVocabulary() {
    const { topicId } = useNotebook();
    const { showAddDefinitionsModal } = useNotebookVocabulary();

    return <div className="min-w-48 max-w-96 py-2 h-full flex flex-col">
        <header className="mb-2 px-2 flex items-center justify-between">
            <Link href={`/topics/${topicId}/notebook/vocabulary`} color="foreground" className="font-medium text-lg">
                <h1>Vocabulary</h1>
            </Link>
            <Dropdown placement="bottom-start">
                <Tooltip content={"Add more content"}>
                    <div>
                        <DropdownTrigger>
                            <Button size="sm" isIconOnly>
                                <IconTextPlus/>
                            </Button>
                        </DropdownTrigger>
                    </div>
                </Tooltip>
                <DropdownMenu>
                    <DropdownItem
                        key="definition"
                        startContent={<IconPencilPlus/>}
                        onPress={showAddDefinitionsModal}
                    >Definition</DropdownItem>
                    <DropdownItem key="area" startContent={<IconFolderPlus/>}>Area</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </header>
    </div>;
}