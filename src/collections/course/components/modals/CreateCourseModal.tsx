import { ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Input, Textarea } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { IconPlus } from "@tabler/icons-react";
import { toast } from "react-toastify";
import { useMemo, useState } from "react";
import { createCourseAction } from "@/collections/course/actions";

// export type CreateCourseModalAction = (name: string, description: string) => Promise<string | undefined>;

export default function CreateCourseModal() {
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

    return <ModalContent>
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
                        <Checkbox
                            classNames={{
                                label: "text-small",
                            }}
                        >
                            Public visibility
                        </Checkbox>
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
                        startContent={<IconPlus/>}
                        isDisabled={!isValid}
                        isLoading={loading}
                        onPress={async () => {
                            setLoading(true);
                            const error = await createCourseAction(name, description);
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