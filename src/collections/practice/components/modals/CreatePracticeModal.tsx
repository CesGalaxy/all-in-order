"use client";

import { ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { IconPlus } from "@tabler/icons-react";
import { toast } from "react-toastify";
import { useState } from "react";

export type RequiredCreatePracticeAction = (title: string, description: string) => Promise<string | undefined>;

function CreatePracticeModal({ action }: { action: RequiredCreatePracticeAction }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(false);

    return <ModalContent>
        {(onClose) => (
            <>
                <ModalHeader className="flex flex-col gap-1">Create a new practice</ModalHeader>
                <ModalBody>
                    <Input
                        autoFocus
                        label="Title"
                        placeholder="Enter the title of the practice"
                        variant="bordered"
                        value={title}
                        onValueChange={setTitle}
                        isRequired
                        validate={value => value ? "" : "Title is required"}
                        size="lg"
                    />
                    <Textarea
                        label="Description"
                        placeholder="Enter the description of the practice (optional)"
                        variant="bordered"
                        rows={3}
                        maxLength={512}
                        value={description}
                        onValueChange={setDescription}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        startContent={<IconPlus/>}
                        isDisabled={loading || !title}
                        isLoading={loading}
                        onPress={async () => {
                            setLoading(true);
                            const error = await action(title, description);
                            setLoading(false);

                            if (error) {
                                toast(error, { type: "error" });
                            } else {
                                toast("Practice created successfully!", { type: "success" });
                                onClose();
                            }
                        }}
                    >
                        Create
                    </Button>
                </ModalFooter>
            </>
        )}
    </ModalContent>;
}

export default CreatePracticeModal;
