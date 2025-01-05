"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { IconListCheck, IconRowInsertBottom, IconTransitionBottom, IconTrash } from "@tabler/icons-react";
import { Select, SelectItem } from "@nextui-org/select";
import { ChoicesInputMethod } from "@/modules/learn/question/Choice/index";
import type { QuestionCreatorProps } from "@/modules/learn/question";

const INITIAL_CHOICES: [number, string, boolean][] = [
    [0, "Example choice 1", true],
    [1, "Example choice 2", false],
    [2, "Example choice 3", false],
];

const ERROR_MESSAGE = "At least one choice must be correct";

function CreateChoiceQuestion({ draft, setDraft, initialData }: QuestionCreatorProps<'choice'>) {
    const [choices, setChoices] = useState<[number, string, boolean][]>(initialData
        ? Object.entries(initialData.choices).map(([choice, isCorrect]) => [Math.random(), choice, isCorrect])
        : INITIAL_CHOICES
    );
    const [method, setMethod] = useState<ChoicesInputMethod>(typeof draft === "object" ? draft.method : "checklist");
    const [mustSelectAll, setMustSelectAll] = useState(typeof draft === "object" ? draft.mustSelectAll : true);

    // Check that at least one choice is marked as correct
    const validChoices = useMemo(() => choices.filter(c => c[2]), [choices]);
    const areChoicesValid = useMemo(() => choices.length > 1 && validChoices.some(Boolean), [validChoices, choices]);

    useEffect(() => {
        if (areChoicesValid) setDraft({
            choices: Object.fromEntries(choices.map(([_, choice, isCorrect]) => [choice, isCorrect])),
            method,
            mustSelectAll
        });
    }, [areChoicesValid, choices, method, setDraft, mustSelectAll]);

    useEffect(() => {
        if (!areChoicesValid && draft !== ERROR_MESSAGE) setDraft(ERROR_MESSAGE);
    }, [areChoicesValid, draft, setDraft]);

    useEffect(() => {
        if (!mustSelectAll && validChoices.length === 1) setMustSelectAll(true);
    }, [validChoices.length, mustSelectAll]);

    return <div>
        <ul className="flex flex-col items-stretch gap-4">
            {choices.map(([id, choice, isCorrect], i) => <ButtonGroup key={id} className="flex items-stretch" as="li">
                <Input
                    startContent={<Checkbox
                        isSelected={isCorrect}
                        onValueChange={value => setChoices(choices.map(c => c[0] == id ? [id, choice, value] : c))}
                    />}
                    value={choice}
                    onValueChange={value => setChoices(choices.map(c => c[0] == id ? [id, value, isCorrect] : c))}
                    variant="faded"
                    classNames={{ inputWrapper: "rounded-r-none" }}
                    placeholder="Enter choice"
                />
                <Button
                    isIconOnly
                    color="danger"
                    variant="faded"
                    onPress={() => setChoices(choices.filter(c => c[0] != id))}
                    isDisabled={choices.length < 3}
                ><IconTrash/></Button>
            </ButtonGroup>)}
        </ul>
        <br/>
        <nav className="grid grid-cols-2 gap-4 items-stretch">
            <Button
                size="lg"
                className="h-full"
                startContent={<IconRowInsertBottom/>}
                variant="flat"
                onPress={() => choices.length > 1 && setChoices(choices.concat([[Math.random(), "", false]]))}
            >
                Add choice
            </Button>
            <Select
                label="Selection method"
                selectedKeys={[method]}
                onSelectionChange={value => value.currentKey && setMethod(value.currentKey as ChoicesInputMethod)}
            >
                <SelectItem
                    key="checklist"
                    description="Show a list with the choices"
                    startContent={<IconListCheck className="shrink-0"/>}
                >
                    Checklist
                </SelectItem>
                <SelectItem
                    key="slots"
                    description="A slot for each valid answers"
                    startContent={<IconTransitionBottom className="shrink-0"/>}
                >
                    Slots
                </SelectItem>
            </Select>
        </nav>
        <br/>
        <Checkbox isSelected={mustSelectAll} onValueChange={setMustSelectAll} isDisabled={validChoices.length === 1}>
            Must select all correct choices
        </Checkbox>
    </div>;
}

export default CreateChoiceQuestion;