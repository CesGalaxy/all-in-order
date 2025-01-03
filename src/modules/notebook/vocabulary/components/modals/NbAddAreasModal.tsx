"use client";

import ModalForm from "@/components/utils/ModalForm";
import { Input, Textarea } from "@nextui-org/input";
import { useState } from "react";
import useNotebookVocabulary from "@/modules/notebook/vocabulary/reactivity/hooks/useNotebookVocabulary";
import { wrapActionFunctionState } from "@/reactivity/hooks/useActionFunction";
import dynamic from "next/dynamic";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";

const Picker = dynamic(
    () => import('emoji-picker-react'),
    { ssr: false, loading: () => <Spinner>Loading</Spinner> }
);

export default function NbAddAreasModal() {
    const [name, setName] = useState("");
    const [icon, setIcon] = useState("✏️");
    const [description, setDescription] = useState("");
    const { addAreasState } = useNotebookVocabulary();

    return <ModalForm
        title={"New area"}
        isFormValid={true}
        altActionState={wrapActionFunctionState(addAreasState, action => action([{ name, icon, description }]))}
        handleSuccess="close"
    >
        <div className="flex gap-3">
            <Popover>
                <PopoverTrigger>
                    <Button isIconOnly size="lg" variant="faded" className="text-xl">{icon}</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Picker
                        onEmojiClick={emoji => setIcon(emoji.emoji)}
                    />
                </PopoverContent>
            </Popover>
            <Input
                label={"Name"}
                labelPlacement="inside"
                placeholder="e.g. 'Organic Chemistry'"
                value={name}
                onValueChange={setName}
                size="sm"
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