"use client";

import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { IconFolderPlus, IconPencilPlus, IconTextPlus } from "@tabler/icons-react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { Tooltip } from "@heroui/tooltip";
import useNotebook from "@/modules/notebook/app/reactivity/hooks/useNotebook";
import useNotebookVocabulary from "@/modules/notebook/vocabulary/reactivity/hooks/useNotebookVocabulary";

export default function NotebookSidebarVocabulary() {
    const { topicId } = useNotebook();
    const {
        addDefinitionsState: [loading],
        showAddDefinitionsModal,
        showAddAreasModal,
        areas
    } = useNotebookVocabulary();

    return <div className="w-full md:w-auto md:min-w-48 md:max-w-96 py-2 h-full flex flex-col">
        <header className="mb-2 px-2 flex items-center justify-between">
            <Link href={`/topics/${topicId}/notebook/vocabulary`} color="foreground"
                  className="font-medium text-lg">
                <h1>Vocabulary</h1>
            </Link>
            <Dropdown placement="bottom-start" isDisabled={loading}>
                <Tooltip content={"Add more content"}>
                    <div>
                        <DropdownTrigger>
                            <Button size="sm" isIconOnly isLoading={loading}>
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
                        isDisabled={!areas || areas.length === 0}
                    >Definition</DropdownItem>
                    <DropdownItem
                        key="area"
                        startContent={<IconFolderPlus/>}
                        onPress={showAddAreasModal}
                    >Area</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </header>
        <ul className="flex gap-2 flex-wrap">
            {areas.map(area => <li key={area.id} className="px-2 py-1">
                <Link
                    href={`/topics/${topicId}/notebook/vocabulary/${encodeURIComponent(area.name)}`}
                    color="foreground"
                    className="font-medium" isBlock size="lg">
                    {area.icon} {area.name}
                </Link>
            </li>)}
        </ul>
    </div>;
}