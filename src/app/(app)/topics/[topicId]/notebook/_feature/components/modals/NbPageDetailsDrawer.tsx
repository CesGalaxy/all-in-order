"use client";

import { DrawerBody, DrawerContent, DrawerFooter, DrawerHeader } from "@nextui-org/drawer";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import useNotebookPage from "@/app/(app)/topics/[topicId]/notebook/_feature/reactivity/hooks/useNotebookPage";
import { useState } from "react";
import { toast } from "react-toastify";

const FONT_FAMILIES = [
    { id: "sans", name: "Sans serif", className: "font-sans" },
    { id: "serif", name: "Serif", className: "font-serif" },
    { id: "mono", name: "Monospace", className: "font-mono" }
];

export default function NbPageDetailsDrawer({ name }: { name: string }) {
    const { data: { appearance }, setData, saveContent } = useNotebookPage();
    const [draft, setDraft] = useState(appearance);
    const [saving, setSaving] = useState(false);

    return <DrawerContent>{onClose => <>
        <DrawerHeader>{name}</DrawerHeader>
        <DrawerBody>
            <Select
                aria-label="Font family"
                items={FONT_FAMILIES}
                className=""
                renderValue={fonts => fonts.map(font => font.rendered)}
                size="lg"
                selectedKeys={[appearance.font.family]}
                onSelectionChange={e => {
                    if (!e.currentKey) return;
                    const newDraft = { ...draft };
                    newDraft.font.family = e.currentKey;
                    setDraft(newDraft);
                }}
            >
                {font => <SelectItem key={font.id}>
                    <span className={font.className + " text-xl"}>{font.name}</span>
                </SelectItem>}
            </Select>
        </DrawerBody>
        <Divider/>
        <DrawerFooter className="grid grid-cols-2">
            <Button color="danger" variant="flat" onPress={() => {
                const sure = confirm("Are you sure you want to discard changes?");
                if (sure) onClose();
            }} isDisabled={saving}>
                Cancel
            </Button>
            <Button color="primary" isLoading={saving} onPress={async () => {
                setSaving(true);
                setData(data => ({ ...data, appearance: draft }));
                if (await saveContent()) {
                    onClose();
                    toast.success("Changes saved");
                } else {
                    toast.error("Failed to save changes");
                }
                setSaving(false);
            }}>
                Save
            </Button>
        </DrawerFooter>
    </>}</DrawerContent>;
}