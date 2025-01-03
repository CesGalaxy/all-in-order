"use client";

import ModalForm from "@/components/utils/ModalForm";
import { Input, Textarea } from "@nextui-org/input";
import useNotebookNotes from "@/modules/notebook/notes/reactivity/hooks/useNotebookNotes";

export default function NbAddNoteModal() {
    const { createNote } = useNotebookNotes();

    return <ModalForm
        title={"Create a new note"}
        isFormValid={true}
        action={createNote}
    >
        <Input
            label={"Title (optional)"}
            name="title"
        />
        <Textarea
            placeholder="Write your ideas here..."
            name="content"
            minRows={5}
            maxRows={12}
        />
    </ModalForm>
}