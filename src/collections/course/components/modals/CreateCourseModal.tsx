"use client";

import { Input, Textarea } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";
import { Link } from "@nextui-org/link";
import { useState } from "react";
import { createCourseAction, CreateCourseActionResponse, CreateCourseFields } from "@/collections/course/actions";
import useValidation from "@/reactivity/hooks/useValidation";
import { COURSE_DESCRIPTION, COURSE_NAME } from "@/collections/course/schemas";
import ModalForm from "@/components/utils/ModalForm";
import { IconPlus } from "@tabler/icons-react";

export type CreateCourseModalAction = (data: CreateCourseFields) => Promise<CreateCourseActionResponse>;

export interface CreateCourseModalProps {
    action?: CreateCourseModalAction;
}

function CreateCourseModal({ action = createCourseAction }: CreateCourseModalProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isPublic, setIsPublic] = useState(false);

    const [nameValidation, validateName, isNameValid] = useValidation(COURSE_NAME, name);
    const [descriptionValidation, validateDescription, isDescriptionValid] = useValidation(COURSE_DESCRIPTION, description);

    const submit = () => action({ name, description, is_public: isPublic });

    return <ModalForm
        title="Create a new course"
        buttonLabel="Create"
        buttonIcon={<IconPlus/>}
        isFormValid={isNameValid && isDescriptionValid}
        action={submit}
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
            <Checkbox isSelected={isPublic} onValueChange={setIsPublic} name="is_public">
                Public visibility
            </Checkbox>
            <Link color="primary" href="#" size="sm">
                Already have a code?
            </Link>
        </div>
    </ModalForm>;
}

export default CreateCourseModal;