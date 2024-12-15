"use client";

import ModalForm from "@/components/utils/ModalForm";
import { Input, Textarea } from "@nextui-org/input";
import { useState } from "react";
import useNotebookVocabulary from "@/app/topics/[topicId]/notebook/_feature/reactivity/hooks/useNotebookVocabulary";
import { wrapActionFunctionState } from "@/reactivity/hooks/useActionFunction";

export default function NbAddDefinitionsModal() {
    const [term, setTerm] = useState("");
    const [definition, setDefinition] = useState("");
    const [area, setArea] = useState<number>();

    const { addDefinitionsState, areas } = useNotebookVocabulary();

    return <ModalForm
        title={"New definition"}
        isFormValid={true}
        altActionState={wrapActionFunctionState(addDefinitionsState, action => action([{ term, definition, area }]))}
        handleSuccess="close"
    >
        <Input
            label={"Term"}
            placeholder="e.g. 'Hypotenuse'"
            value={term}
            onValueChange={setTerm}
            required
        />
        <Textarea
            label={"Definition"}
            placeholder="e.g. 'The longest side of a right-angled triangle, opposite the right angle.'"
            value={definition}
            onValueChange={setDefinition}
            required
        />
    </ModalForm>
}