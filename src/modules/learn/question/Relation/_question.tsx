"use client";

import type { QuestionCreatorProps } from "@/modules/learn/question";
import { useEffect, useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { IconPlus, IconTrash } from "@tabler/icons-react";

function CreateRelationQuestion({ draft, setDraft, initialData }: QuestionCreatorProps<'relation'>) {
    const [pairs, setPairs] = useState<Record<string, string>>(initialData?.pairs ?? {
        "1": "",
        "2": "",
        "3": "",
    });

    useEffect(() => {
        if (Object.keys(pairs).length > 1) setDraft({ pairs });
    }, [pairs, setDraft]);

    useEffect(() => {
        if (Object.keys(pairs).length < 2 && draft !== undefined) setDraft(undefined);
    }, [draft, pairs, setDraft]);

    return <div>
        <ul className="space-y-4 mb-4">
            {Object.entries(pairs).map(([key, value], index) => <li
                key={index}
                className="flex items-center rounded-full overflow-clip"
            >
                <Input
                    value={key}
                    onChange={e => {
                        const newPairs = { ...pairs };
                        delete newPairs[key];
                        setPairs({ ...newPairs, [e.target.value]: value });
                    }}
                    radius="none"
                    color="primary"
                />
                <Input
                    value={value}
                    onChange={e => setPairs(pairs => ({ ...pairs, [key]: e.target.value }))}
                    radius="none"
                />
            </li>)}
        </ul>
        <nav className="flex items-center justify-around w-full">
            <Button
                startContent={<IconPlus/>}
                onPress={() => setPairs(pairs => ({ ...pairs, "": "" }))}
            >Add pair</Button>
            <Button
                startContent={<IconTrash/>}
                isDisabled={Object.keys(pairs).length < 3}
                onPress={() => {
                    const newPairs = { ...pairs };
                    delete newPairs[Object.keys(newPairs).pop()!];
                    setPairs(newPairs);
                }}
            >Remove last</Button>
        </nav>
    </div>
}

export default CreateRelationQuestion;