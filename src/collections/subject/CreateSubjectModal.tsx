"use client";

import { ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { IconCheck, IconPlus } from "@tabler/icons-react";
import { toast } from "react-toastify";
import { useMemo, useState } from "react";
import { createSubjectAction } from "@/collections/subject/actions";

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

export type CreateSubjectModalProps = ActionOrCourseId & {
    courseName?: string;
}

export type ActionOrCourseId = {
    courseId: number;
} | {
    action: (name: string, description: string, color: number) => Promise<string | undefined>;
}

export default function CreateSubjectModal(props: CreateSubjectModalProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState(SUBJECT_COLORS[3]);

    const [loading, setLoading] = useState(false);

    const validateName = () => {
        if (!name) return "Name is required";
        if (name.length < 3) return "Name is too short";
        if (name.length > 64) return "Name is too long";
    }

    const validateDescription = () => description.length > 512 ? "Description is too long" : undefined;

    const isNameValid = useMemo(validateName, [name]);
    const isDescriptionInvalid = useMemo(validateDescription, [description]);

    const isValid = !isNameValid && !isDescriptionInvalid;

    return <ModalContent>
        {(onClose) => (
            <>
                <ModalHeader className="flex flex-col gap-1">
                    Create a new subject
                    {props.courseName && " in " + props.courseName}
                </ModalHeader>
                <ModalBody>
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
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        startContent={<IconPlus/>}
                        isDisabled={!isValid}
                        isLoading={loading}
                        onPress={async () => {
                            let formatedColor = parseInt(color.slice(1), 16);

                            if (isNaN(formatedColor)) {
                                toast("Invalid color", { type: "error" });
                                return;
                            }

                            // Add alpha channel (0xRRGGBBAA)
                            formatedColor = formatedColor << 8 | 0xFF;

                            const action = "action" in props
                                ? props.action
                                : createSubjectAction.bind(null, props.courseId);

                            setLoading(true);
                            const error = await action(name, description, formatedColor);
                            setLoading(false);

                            if (error) toast(error, { type: "error" });
                        }}
                    >
                        Create
                    </Button>
                </ModalFooter>
            </>
        )}
    </ModalContent>;
}