"use client";

import { IconFilePlus, IconUpload } from "@tabler/icons-react";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { createTopicDocument } from "@/lib/supabase/storage/topic_documents";
import { useTranslations } from "next-intl";

export default function CreateDocumentButton({ topicId }: { topicId: number }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [name, setName] = useState("");
    const [error, setError] = useState<string>();

    const t = useTranslations();

    return <>
        <ButtonGroup>
            <Button startContent={<IconFilePlus/>} color="primary" onPress={onOpen}>
                {t("Dash.Topic.create_doc_new")}
            </Button>
            <Button startContent={<IconUpload/>}>{t("Dash.Topic.upload_doc")}</Button>
        </ButtonGroup>
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
        >
            <ModalContent>{(onClose) => <>
                <ModalHeader className="flex flex-col gap-1">{t("Dash.Topic.create_doc")}</ModalHeader>
                <ModalBody>
                    <Input
                        autoFocus
                        label="Document name"
                        placeholder="Enter the name of the new document"
                        variant="bordered"
                        validate={(value) => value.length > 0 ? null : "Please enter a name for the document"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        isRequired
                    />
                    {error && <p className="text-red-500">{error}</p>}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                        {t("Global.cancel")}
                    </Button>
                    <Button color="primary" onPress={async () => {
                        let error = await createTopicDocument(topicId, name);

                        error ? setError(error.message) : onClose();
                    }}>
                        {t("Global.create")}
                    </Button>
                </ModalFooter>
            </>
            }</ModalContent>
        </Modal>
    </>
}