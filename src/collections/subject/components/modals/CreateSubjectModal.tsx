"use client";

import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { IconCheck, IconPlus } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { ActionResponse } from "@/lib/helpers/form";
import { createSubjectAction } from "@/collections/subject/actions";
import ModalForm from "@/components/utils/ModalForm";
import useValidation from "@/reactivity/hooks/useValidation";
import { SUBJECT_DESCRIPTION, SUBJECT_NAME } from "@/collections/subject/schemas";

const SUBJECT_COLORS = [
    // red
    "#EF9A9A", "#E57373", "#EF5350", "#F44336", "#E53935", "#D32F2F",
    // orange
    "#FFAB91", "#FF8A65", "#FF7043", "#FF5722", "#F4511E", "#E64A19",
    // yellow
    "#FFF59D", "#FFF176", "#FFEE58", "#FFEB3B", "#FDD835", "#FBC02D",
    // green
    "#A5D6A7", "#81C784", "#66BB6A", "#4CAF50", "#43A047", "#388E3C",
    // blue
    "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2",
    // purple
    "#CE93D8", "#BA68C8", "#AB47BC", "#9C27B0", "#8E24AA", "#7B1FA2",
];

export type CreateSubjectModalAction = (name: string, description: string, color: number) => Promise<ActionResponse<never>>;

export interface CreateSubjectModalProps {
    courseName?: string;
    action: number | CreateSubjectModalAction;
}

function CreateSubjectModal({ courseName, action }: CreateSubjectModalProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState(SUBJECT_COLORS[3]);

    const createSubject = useMemo(
        () => typeof action === "number" ? createSubjectAction.bind(null, action) : action,
        [action]
    );

    const [, validateName, isNameValid] = useValidation(SUBJECT_NAME, name);
    const [, validateDescription, isDescriptionValid] = useValidation(SUBJECT_DESCRIPTION, description);

    return <ModalForm
        title={"Create a new subject" + (courseName ? (" in " + courseName) : "")}
        buttonLabel="Create"
        buttonIcon={<IconPlus/>}
        action={() => {
            let numericColor = parseInt(color.slice(1), 16);

            if (isNaN(numericColor)) {
                return "Invalid color";
            }

            // Add alpha channel (0xRRGGBBAA)
            numericColor = numericColor << 8 | 0xFF;

            return createSubject(name, description, numericColor);
        }}
        isFormValid={isNameValid && isDescriptionValid}
    >
        <Input
            autoFocus
            label="Name"
            placeholder="Enter the name of the course"
            variant="bordered"
            isRequired
            validate={validateName}
            value={name}
            onChange={e => setName(e.target.value)}
        />
        <Textarea
            label="Description"
            placeholder="A description for the course (optional)"
            variant="bordered"
            rows={3}
            maxLength={512}
            validate={validateDescription}
            value={description}
            onChange={e => setDescription(e.target.value)}
        />
        <ul className="grid grid-cols-6 p-4 gap-4">
            {
                SUBJECT_COLORS.map(colorOption => (
                    <li key={colorOption} className="w-full aspect-square">
                        <Button
                            color="primary"
                            variant="flat"
                            style={{ backgroundColor: colorOption }}
                            onPress={() => setColor(colorOption)}
                            isIconOnly
                            size="sm"
                            className="w-full h-full"
                        >
                            {color === colorOption && <IconCheck color="white"/>}
                        </Button>
                    </li>
                ))
            }
        </ul>
    </ModalForm>;
}

export default CreateSubjectModal;