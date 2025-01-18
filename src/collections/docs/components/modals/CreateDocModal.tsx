"use client";

import ModalForm from "@/components/utils/ModalForm";
import { useTranslations } from "next-intl";
import { Input } from "@nextui-org/input";
import useValidatedState from "@/reactivity/hooks/useValidatedState";
import { TOPIC_DOC_NAME } from "@/collections/docs/schemas";
import { Switch } from "@nextui-org/switch";
import { IconLock, IconLockOff } from "@tabler/icons-react";
import { cn } from "@nextui-org/theme";
import { useState } from "react";
import { createTopicDocument } from "@/lib/supabase/storage/topicDoc";
import DocType from "@/features/docs/DocType";
import { Select, SelectItem, SelectSection } from "@nextui-org/select";
import DocTypeIcon from "@/features/docs/components/DocTypeIcon";
import { Divider } from "@nextui-org/divider";
import { Checkbox } from "@nextui-org/checkbox";

const AVAILABLE_TYPES = [DocType.MD];

export default function CreateDocModal({ action }: { action: number }) {
    const t = useTranslations();

    const [name, setName, nameValidation, validateName, isNameValid] = useValidatedState(TOPIC_DOC_NAME, "");
    const [docType, setDocType] = useState<typeof AVAILABLE_TYPES[any]>(DocType.MD);
    const [isPrivate, setPrivate] = useState(true);
    const [openAfterCreate, setOpenAfterCreate] = useState(true);

    const CurrentTypeIcon = DocTypeIcon[docType];

    return <ModalForm
        title={t("Dash.Topic.create_doc")}
        action={() => createTopicDocument(action, isPrivate, name)}
        isFormValid={true}
        footer={<Checkbox checked={openAfterCreate} onValueChange={setOpenAfterCreate}>Open after create</Checkbox>}
    >
        <Input
            autoFocus
            label="Document name"
            placeholder="Enter the name of the new document"
            variant="bordered"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isRequired
            validate={validateName}
            isInvalid={!isNameValid}
            errorMessage={nameValidation?.join("; ")}
        />
        <Select
            label="File type"
            selectedKeys={[docType]}
            onChange={e => e.target.value && setDocType(e.target.value as any)}
            startContent={<CurrentTypeIcon/>}
        >
            <SelectSection title="Document">
                <SelectItem key={DocType.MD} textValue="Markdown" startContent={<DocTypeIcon.md className="w-8 h-8"/>}>
                    <div className="flex flex-col">
                        <span className="text-small">{t('Extra.DocType.md.name')}</span>
                        <span className="text-tiny text-default-400">{t('Extra.DocType.md.desc_short')}</span>
                    </div>
                </SelectItem>
            </SelectSection>
        </Select>
        <Divider/>
        <Switch
            classNames={{
                base: cn(
                    "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                    "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                    "data-[selected=true]:border-primary",
                ),
                wrapper: "p-0 h-4 overflow-visible",
                thumb: cn("w-8 h-8 border-2 shadow-lg",
                    "group-data-[hover=true]:border-primary",
                    // selected
                    "group-data-[selected=true]:ml-6",
                    // pressed
                    "group-data-[pressed=true]:w-10",
                    "group-data-[selected]:group-data-[pressed]:ml-4",
                ),
            }}
            size="lg"
            thumbIcon={({ isSelected, className }) => isSelected
                ? <IconLock className={className + " w-5 h-5"}/>
                : <IconLockOff className={className + " w-5 h-5"}/>}
            isSelected={isPrivate}
            onValueChange={setPrivate}
        >
            <div className="flex flex-col gap-1">
                <p className="text-medium">Private file</p>
                <p className="text-tiny text-default-400">
                    Only you will be able to read it.
                </p>
            </div>
        </Switch>
    </ModalForm>;
}