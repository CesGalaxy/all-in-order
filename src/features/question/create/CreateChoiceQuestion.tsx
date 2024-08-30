"use client";

import { useQuestionCreationContext } from "@/features/question/QuestionCreationContext";
import { useEffect, useMemo, useState } from "react";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { IconCheck, IconList, IconListLetters, IconListNumbers, IconMist, IconTrash, IconX } from "@tabler/icons-react";
import { Select, SelectItem } from "@nextui-org/select";

const LIST_TYPE_ICONS = {
    none: <IconMist/>,
    alphabet: <IconListLetters/>,
    number: <IconListNumbers/>,
    roman: <IconList/>
}

export default function CreateChoiceQuestion({ title }: { title: string }) {
    const { setQuestion } = useQuestionCreationContext();

    const [choices, setChoices] = useState<[string, boolean][]>([["Example choice 1", true]]);
    const [listType, setListType] = useState<"none" | "alphabet" | "number" | "roman">("none");

    const listTypeIcon = useMemo(() => LIST_TYPE_ICONS[listType], [listType]);

    useEffect(() => setQuestion(choices.length > 1 && choices.filter(([_, correct]) => correct).length > 0 ? {
        title,
        type: "choice",
        list_type: listType,
        correct_choices: choices.filter(([_, correct]) => correct).map(([choice]) => choice),
        wrong_choices: choices.filter(([_, correct]) => !correct).map(([choice]) => choice)
    } : undefined), [choices, listType, title]);

    return <div className="grid grid-cols-1 gap-4">
        {choices.map(([choice, correct], i) => <div key={i} className="flex gap-2">
            <Input
                value={choice}
                onChange={(e) => setChoices(choices.map((c, j) => i === j ? [e.target.value, c[1]] : c))}
            />
            <ButtonGroup>
                <Button
                    color={correct ? "success" : "danger"}
                    onClick={() => setChoices(choices.map((c, j) => i === j ? [c[0], !c[1]] : c))}
                    startContent={correct ? <IconCheck/> : <IconX/>}
                >
                    {correct ? "Correct" : "Wrong"}
                </Button>
                <Button onClick={() => setChoices(choices.filter((_, j) => i !== j))} isIconOnly>
                    <IconTrash/>
                </Button>
            </ButtonGroup>
        </div>)}
        <div className="grid grid-cols-2 gap-4">
            <Input
                key={choices.length}
                label="Type a new choice..."
                value=""
                className="place-self-stretch"
                validate={value => choices.length < 2
                    ? "Please enter at least two choices"
                    : choices.filter(([_, correct]) => correct).length < 1
                        ? "Please select at least one correct choice"
                        : null
                }
                onChange={e => {
                    e.target.blur();
                    setChoices([...choices, [e.target.value, false]]);
                }}
            />
            <Select
                label="List type"
                selectedKeys={[listType]}
                onChange={e => e.target.value ? setListType(e.target.value as typeof listType) : null}
                startContent={listTypeIcon}
            >
                <SelectItem key="none" value="none" startContent={<IconMist/>}>None</SelectItem>
                <SelectItem key="alphabet" value="alphabet" startContent={<IconListLetters/>}>Alphabet</SelectItem>
                <SelectItem key="number" value="number" startContent={<IconListNumbers/>}>Number</SelectItem>
                <SelectItem key="roman" value="roman" startContent={<IconList/>}>Roman Numbers</SelectItem>
            </Select>
        </div>
    </div>;
}