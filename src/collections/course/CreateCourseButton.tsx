"use client";

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { IconPlus } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { create_course } from "@/supabase/models/Course";
import { toast } from "react-toastify";

export default function CreateCourseButton() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(false);

    const validateName = () => {
        if (!name) return "Name is required";
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
            <Button onPress={onOpen} color="primary">Create a course</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Create a new course</ModalHeader>
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
                                <div className="flex py-2 px-1 justify-between">
                                    {/*<Checkbox*/}
                                    {/*    classNames={{*/}
                                    {/*        label: "text-small",*/}
                                    {/*    }}*/}
                                    {/*>*/}
                                    {/*    Remember me*/}
                                    {/*</Checkbox>*/}
                                    <Link color="primary" href="#" size="sm">
                                        Already have a code?
                                    </Link>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={onClose}
                                    startContent={<IconPlus/>}
                                    isDisabled={!isValid}
                                    isLoading={loading}
                                    onClick={async () => {
                                        setLoading(true);
                                        const error = await create_course(name, description);
                                        setLoading(false);

                                        if (!error) onClose();

                                        toast(error?.message || "Course created successfully", {
                                            type: error ? "error" : "success",
                                        });
                                    }}
                                >
                                    Create
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}