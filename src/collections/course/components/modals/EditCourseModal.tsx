"use client";

import { Input, Textarea } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { COURSE_DESCRIPTION, COURSE_NAME } from "@/collections/course/schemas";
import ModalForm from "@/components/utils/ModalForm";
import { updateCourseAction, UpdateCourseActionResponse, UpdateCourseFields } from "@/collections/course/actions";
import useValidatedState from "@/reactivity/hooks/useValidatedState";

export type EditCourseModalAction = (data: UpdateCourseFields) => Promise<UpdateCourseActionResponse>;

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
    const [name, setName, nameValidation, validateName, isNameValid] = useValidatedState(COURSE_NAME, courseName);
    const [description, setDescription, descriptionValidation, validateDescription, isDescriptionValid] =
        useValidatedState(COURSE_DESCRIPTION, courseDescription);

    const [isPublic, setIsPublic] = useState(courseVisibility);

    const createCourse = useMemo<EditCourseModalAction>(() => typeof action === "number"
            ? updateCourseAction.bind(null, action)
            : action,
        [action]
    );

    return <ModalForm
        title={"Edit " + courseName}
        buttonLabel="Save"
        buttonIcon={<IconDeviceFloppy/>}
        action={() => createCourse({ name, description, is_public: isPublic })}
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