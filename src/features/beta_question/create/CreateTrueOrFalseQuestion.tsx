"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { QuestionDraft } from "@aio/db/features/questions";
import { Input } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";
import { Button } from "@nextui-org/button";
import { IconTrash } from "@tabler/icons-react";
import { QuestionTrueOrFalseData } from "@aio/db/features/questions/TrueOrFalse";

function CreateTrueOrFalseQuestion({ draft, setDraft }: {
    draft?: QuestionDraft<QuestionTrueOrFalseData, "true_or_false">,
    setDraft: Dispatch<SetStateAction<QuestionDraft<QuestionTrueOrFalseData, "true_or_false">>>
}) {
    const [rows, setRows] = useState<Record<string, [string, boolean]>>({
        ["2"]: ["This is true", true],
        ["3"]: ["This is false", false]
    });

    const atLeastOneRow = Object.keys(rows).length !== 0;

    useEffect(() => {
        if (atLeastOneRow) setDraft({ rows: Object.fromEntries(Object.values(rows)) });
    }, [atLeastOneRow, rows, setDraft]);

    useEffect(() => {
        if (!atLeastOneRow && draft) setDraft(undefined);
    }, [atLeastOneRow, draft, setDraft]);

    return <ul className="w-full flex flex-col gap-4">
        {Object.entries(rows).map(([id, [row, isTrue]]) => <Input
            as="li"
            key={id}
            className="w-full"
            value={row}
            onValueChange={value => {
                setRows({
                    ...rows,
                    [id]: [value, isTrue]
                });
            }}
            startContent={
                <Checkbox
                    isSelected={isTrue}
                    onValueChange={value => setRows({
                        ...rows,
                        [id]: [row, value]
                    })}
                />
            }
            endContent={
                <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    onPress={() => {
                        delete rows[id];
                        setRows({ ...rows });
                    }}
                >
                    <IconTrash/>
                </Button>
            }
        />)}
        <Button
            onPress={() => {
                setRows({
                    ...rows,
                    [Math.random().toString()]: ["New row", true]
                });
            }}
        >
            Add row
        </Button>
    </ul>;
}

export default CreateTrueOrFalseQuestion;