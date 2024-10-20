"use client";

import { Input, Textarea } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useCallback, useMemo, useState } from "react";
import { COURSE_DESCRIPTION, COURSE_NAME } from "@/collections/course/schemas";
import { ActionResponse } from "@/lib/helpers/form";
import useValidation from "@/reactivity/hooks/useValidation";
import ModalForm from "@/components/utils/ModalForm";
import { updateCourseAction, UpdateCourseFields } from "@/collections/course/actions";

export type EditCourseModalAction = (data: UpdateCourseFields) => Promise<ActionResponse<never>>;

export interface EditCourseModalProps {
    courseName: string;
    courseDescription: string;
    courseVisibility: boolean;
    action: number | EditCourseModalAction;
}

export default function EditCourseModal({
                                            courseName,
                                            courseDescription,
                                            courseVisibility,
                                            action
                                        }: EditCourseModalProps) {
    const [name, setName] = useState(courseName);
    const [description, setDescription] = useState(courseDescription);
    const [isPublic, setIsPublic] = useState(courseVisibility);

    const [nameValidation, validateName, isNameValid] = useValidation(COURSE_NAME, name);
    const [descriptionValidation, validateDescription, isDescriptionValid] = useValidation(COURSE_DESCRIPTION, description);

    const createCourse = useMemo<EditCourseModalAction>(
        () => typeof action === "number" ? updateCourseAction.bind(null, action) : action,
        [action]
    );

    const submit = useCallback(
        () => createCourse({ name, description, is_public: isPublic }),
        [createCourse, name, description, isPublic]
    );

    return <ModalForm
        title={"Edit " + courseName}
        buttonLabel="Save"
        buttonIcon={<IconDeviceFloppy/>}
        action={submit}
        isFormValid={isNameValid && isDescriptionValid}
        handleSuccess="close"
    >
        <Input
            autoFocus
            label="Name"
            placeholder="Enter the name of the course"
            variant="bordered"
            isRequired
            value={name}
            onChange={e => setName(e.target.value)}
            validate={validateName}
            isInvalid={!isNameValid}
            errorMessage={nameValidation}
        />
        <Textarea
            label="Description"
            placeholder="A description for the course (optional)"
            variant="bordered"
            rows={3}
            maxLength={512}
            value={description}
            onChange={e => setDescription(e.target.value)}
            validate={validateDescription}
            isInvalid={!isDescriptionValid}
            errorMessage={descriptionValidation}
        />
        <div className="flex py-2 px-1 justify-between">
            <Checkbox isSelected={isPublic} onValueChange={setIsPublic}>
                Public visibility
            </Checkbox>
        </div>
    </ModalForm>;
}