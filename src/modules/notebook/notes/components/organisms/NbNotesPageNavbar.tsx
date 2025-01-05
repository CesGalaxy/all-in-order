"use client";

import { IconChevronDown, IconNote } from "@tabler/icons-react";
import { Button, ButtonGroup } from "@nextui-org/button";
import NbNotesPageSearchbar from "@/modules/notebook/notes/components/molecules/NbNotesPageSearchbar";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import useNotebookNotes from "@/modules/notebook/notes/reactivity/hooks/useNotebookNotes";

export default function NbNotesPageNavbar() {
    const { showAddNoteModal } = useNotebookNotes();
    return <header className="flex items-center justify-between w-full mb-8">
        <NbNotesPageSearchbar/>
        <nav className="flex items-center">
            <ButtonGroup color="primary">
                <Button onPress={showAddNoteModal} startContent={<IconNote/>}>Add New</Button>
                <Dropdown>
                    <DropdownTrigger>
                        <Button isIconOnly><IconChevronDown/></Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem key="upload">Upload</DropdownItem>
                        <DropdownItem key="hfjdksh">Refresh</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </ButtonGroup>
        </nav>
    </header>;
}