"use client";

import ModalForm from "@/components/utils/ModalForm";
import { Input, Textarea } from "@heroui/input";
import { useState } from "react";
import useNotebookVocabulary from "@/modules/notebook/vocabulary/reactivity/hooks/useNotebookVocabulary";
import { wrapActionFunctionState } from "@/reactivity/hooks/useActionFunction";
import { Select, SelectItem } from "@heroui/select";
import { IconFolder } from "@tabler/icons-react";

export default function NbAddDefinitionsModal({ defaultArea }: { defaultArea?: string }) {
    const [term, setTerm] = useState("");
    const [definition, setDefinition] = useState("");
    const [area, setArea] = useState<string | undefined>(defaultArea);

    const { addDefinitionsState, areas } = useNotebookVocabulary();

    // TODO(DB): Is area required?

    return <ModalForm
        title={"New definition"}
        isFormValid={true}
        altActionState={wrapActionFunctionState(addDefinitionsState,
            action => action(Number(area), [{ term, definition }]))}
        handleSuccess="close"
    >
        <Input
            label={"Term"}
            placeholder="e.g. 'Hypotenuse'"
            value={term}
            onValueChange={setTerm}
            isRequired
        />
        <Textarea
            label={"Definition"}
            placeholder="e.g. 'The longest side of a right-angled triangle, opposite the right angle.'"
            value={definition}
            onValueChange={setDefinition}
            isRequired
        />
        <Select
            aria-label="Definition area"
            placeholder="Area"
            items={areas}
            selectedKeys={area ? [area] : []}
            onChange={e => setArea(e.target.value)}
            startContent={area
                ? areas.find(a => a.id.toString() == area)?.icon
                : <IconFolder/>}
        >
            {item => <SelectItem key={item.id} value={item.id} startContent={item.icon}>
                {item.name}
            </SelectItem>}
        </Select>
    </ModalForm>
}