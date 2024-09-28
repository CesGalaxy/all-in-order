"use client";

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { IconDeviceFloppy, IconEdit } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { Course } from "@/supabase/models/Course";
import { toast } from "react-toastify";
import { PostgrestError } from "@supabase/supabase-js";
import { Checkbox } from "@nextui-org/checkbox";

export default function EditCourseButton({ course, action }: {
    course: Course,
    action: () => Promise<PostgrestError | undefined>
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [name, setName] = useState(course.name);
    const [description, setDescription] = useState(course.description);
    const [isPublic, setIsPublic] = useState(course.is_public);

    const [loading, setLoading] = useState(false);

    const validateName = () => {
        if (!name) return "Course name is required";
        if (name.length < 3) return "Name is too short";
        if (name.length > 64) return "Name is too long";
    }

    const validateDescription = () => {
        if (description.length > 512) return "Description is too long";
    }

    const isNameValid = useMemo(validateName, [name]);
    const isDescriptionInvalid = useMemo(validateDescription, [description]);

    const isValid = !isNameValid && !isDescriptionInvalid;

    return (
        <>
            <Button onPress={onOpen} startContent={<IconEdit/>}>Edit course</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Edit course</ModalHeader>
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
                                <Checkbox isSelected={isPublic} onValueChange={setIsPublic} size="lg">
                                    Public visibility
                                </Checkbox>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    color="primary"
                                    startContent={<IconDeviceFloppy/>}
                                    isDisabled={!isValid}
                                    isLoading={loading}
                                    onPress={async () => {
                                        setLoading(true);
                                        const error = await action();
                                        setLoading(false);

                                        if (error) {
                                            toast.error("Failed to update course details: " + error.message, {
                                                type: "error"
                                            });
                                        } else {
                                            onClose();
                                            toast.success("Course updated successfully", {
                                                type: "success"
                                            });
                                        }
                                    }}
                                >
                                    Save
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}