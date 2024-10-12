"use client";

import { ChoicesInputMethod, QuestionChoiceData } from "@/features/beta_question/QuestionChoice";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { QuestionDraft } from "@/features/beta_question";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { IconListCheck, IconRowInsertBottom, IconTransitionBottom, IconTrash } from "@tabler/icons-react";
import { Select, SelectItem } from "@nextui-org/select";

const INITIAL_CHOICES: [number, string, boolean][] = [
    [0, "Example choice 1", true],
    [1, "Example choice 2", false],
    [2, "Example choice 3", false],
];

export default CreateChoiceQuestion;

function CreateChoiceQuestion({ draft, setDraft }: {
    draft?: QuestionDraft<QuestionChoiceData, "choice">,
    setDraft: Dispatch<SetStateAction<QuestionDraft<QuestionChoiceData, "choice">>>
}) {
    const [choices, setChoices] = useState<[number, string, boolean][]>(INITIAL_CHOICES);
    const [method, setMethod] = useState<ChoicesInputMethod>("checklist");
    const [single, setSingle] = useState(false);

    const areChoicesValid = useMemo(() => choices.length > 1 && choices.some(c => c[2]), [choices]);

    useEffect(() => {
        if (areChoicesValid) {
            const choicesMap = Object.fromEntries(choices.map(([_, choice, isCorrect]) => [choice, isCorrect]));

            setDraft({ choices: choicesMap, method, single });
        }
    }, [areChoicesValid, choices, method, setDraft, single]);

    useEffect(() => {
        if (!areChoicesValid && typeof draft !== "string") setDraft("At least one choice must be correct");
    }, [areChoicesValid, draft, setDraft]);

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
                    description="Show a list with the possible choices"
                    startContent={<IconListCheck/>}
                >
                    Checklist
                </SelectItem>
                <SelectItem
                    key="slots"
                    description="Add a slot for each valid answers"
                    startContent={<IconTransitionBottom/>}
                >
                    Slots
                </SelectItem>
            </Select>
        </nav>
        <br/>
        <Checkbox
            isSelected={single}
            onValueChange={setSingle}
        >
            Must select all correct choices
        </Checkbox>
    </div>;
}