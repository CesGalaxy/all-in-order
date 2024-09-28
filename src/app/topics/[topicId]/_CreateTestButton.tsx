"use client";

import { IconTextPlus } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { useState } from "react";
import { Input, Textarea } from "@nextui-org/input";
import { createTopicTest } from "@/supabase/models/TopicTest";
import { useTranslations } from "next-intl";

export default function CreateTestButton({ topicId }: { topicId: number }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState<string>();

    const t = useTranslations();

    return <>
        <Button color="primary" startContent={<IconTextPlus/>} onPress={onOpen}>{t("Dash.Topic.create_test")}</Button>
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
        >
            <ModalContent>{(onClose) => <>
                <ModalHeader className="flex flex-col gap-1">{t("Dash.Topic.create_test")}</ModalHeader>
                <ModalBody>
                    <Input
                        autoFocus
                        label="Test name"
                        placeholder="Enter the name of the new test"
                        variant="bordered"
                        validate={(value) => value.length > 0 ? null : "Please enter a name for the test"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        isRequired
                    />
                    <Textarea
                        label="Test description"
                        placeholder="Enter a description for the test"
                        variant="bordered"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {error && <p className="text-red-500">{error}</p>}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                        {t("Global.cancel")}
                    </Button>
                    <Button color="primary" onPress={async () => {
                        const error = await createTopicTest(topicId, name, description);

                        error ? setError(error.message) : onClose();
                    }}>
                        {t("Global.create")}
                    </Button>
                </ModalFooter>
            </>
            }</ModalContent>
        </Modal>
    </>;
}