"use client";

import { Input, Textarea } from "@heroui/input";
import { useState } from "react";
import { Button } from "@heroui/button";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { toast } from "react-toastify";

export interface EditPracticeFormProps {
    practiceTitle: string;
    practiceDescription: string;
    action: (title: string, description: string) => Promise<string | undefined>;
}

function EditPracticeForm({ practiceTitle, practiceDescription, action }: EditPracticeFormProps) {
    const [title, setTitle] = useState(practiceTitle);
    const [description, setDescription] = useState(practiceDescription);

    const [loading, setLoading] = useState(false);

    return <div>
        <Input
            label="Title"
            value={title}
            onValueChange={setTitle}
            placeholder="Enter the title of the practice"
            variant="faded"
            validate={value => value ? undefined : "Title is required"}
        />
        <br/>
        <Textarea
            label="Description"
            value={description}
            onValueChange={setDescription}
            placeholder="What is this practice about?"
            variant="faded"
        />
        <br/>
        <Button
            color="primary"
            startContent={<IconDeviceFloppy/>}
            isDisabled={!title}
            isLoading={loading}
            onPress={async () => {
                setLoading(true);
                const error = await action(title, description);
                setLoading(false);

                error
                    ? toast(error, { type: "error" })
                    : toast("Practice updated", { type: "success" });
            }}
        >
            Save changes
        </Button>
    </div>
}

export default EditPracticeForm;