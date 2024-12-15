"use client";

import ModalForm from "@/components/utils/ModalForm";
import { Input, Textarea } from "@nextui-org/input";
import { useState } from "react";
import useNotebookVocabulary from "@/app/topics/[topicId]/notebook/_feature/reactivity/hooks/useNotebookVocabulary";
import { wrapActionFunctionState } from "@/reactivity/hooks/useActionFunction";

export default function NbAddAreasModal() {
    const [name, setName] = useState("");
    const [icon, setIcon] = useState("✏️");
    const [description, setDescription] = useState("");

    const { addAreasState, areas } = useNotebookVocabulary();

    return <ModalForm
        title={"New area"}
        isFormValid={true}
        altActionState={wrapActionFunctionState(addAreasState, action => action([{ name, icon, description }]))}
        handleSuccess="close"
    >
        <div className="flex gap-3">
            <Input
                label={"Icon"}
                placeholder="🧪"
                value={icon}
                onValueChange={setIcon}
                size="lg"
                className="w-16 shrink-0"
                required
            />
            <Input
                label={"Name"}
                placeholder="e.g. 'Organic Chemistry'"
                value={name}
                onValueChange={setName}
                size="lg"
                required
            />
        </div>
        <Textarea
            label={"Description"}
            placeholder="e.g. 'The study of carbon compounds.'"
            value={description}
            onValueChange={setDescription}
            required
        />
    </ModalForm>
}