"use client";

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { QuestionDraft } from "@aio/db/features/questions";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
    IconCheck,
    IconChevronDown,
    IconEye,
    IconListLetters,
    IconPlus,
    IconRowInsertBottom,
    IconTrash,
    IconWriting,
    IconX
} from "@tabler/icons-react";
import { Gap, QuestionFillTheGapData } from "@aio/db/features/questions/FillTheGap";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Select, SelectItem } from "@nextui-org/select";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";
import { Checkbox } from "@nextui-org/checkbox";

const INITIAL_SEGMENTS: Record<string, Segment> = {
    "[1]": "Hello",
    "[2]": { type: "text", correctValues: ["World", "world", "WORLD"] },
    "[3]": "! My name is",
    "[4]": { type: "choice", correctValues: ["César"], wrongValues: ["World", "Banana"] },
    "[5]": ".",
};

type Segment = string | Omit<Gap, "position">;

export default CreateFillTheGapQuestion;

function CreateFillTheGapQuestion({ draft, setDraft }: {
    draft?: QuestionDraft<QuestionFillTheGapData>,
    setDraft: Dispatch<SetStateAction<QuestionDraft<QuestionFillTheGapData>>>
}) {
    const [segments, setSegments] = useState<Record<string, Segment>>(INITIAL_SEGMENTS);

    const atLeastOneGap = useMemo(() => Object.values(segments).some(segment => typeof segment !== "string"), [segments]);

    useEffect(() => {
        // The gap `position` indicated the char where the gap is placed
        if (atLeastOneGap) {
            const rawSegments = Object.values(segments);

            const positionedGaps: Gap[] = rawSegments.map((segment, i) => {
                if (typeof segment === "string") return undefined;

                const position = rawSegments
                    .slice(0, i)
                    .reduce((acc, curr) => acc + (typeof curr === "string" ? curr.length : 0), 0) - 1;

                return { ...segment, position };
            }).filter((segment): segment is Gap => segment !== undefined);

            const text = rawSegments.map(segment => typeof segment === "string" ? segment : "").join("");

            setDraft({ text, gaps: positionedGaps });
        }
    }, [atLeastOneGap, segments, setDraft]);

    useEffect(() => {
        if (!atLeastOneGap && typeof draft !== "string") setDraft("You must provide at least one gap.");
    }, [atLeastOneGap, draft, setDraft]);

    return <div>
        <ul className="flex flex-col items-stretch gap-4">
            {Object.entries(segments).map(([id, segment]) => typeof segment === "string"
                ? <li key={id}>
                    <Input
                        aria-label="Text segment"
                        value={segment}
                        onValueChange={value => setSegments({ ...segments, [id]: value })}
                        endContent={
                            <Link
                                href="#"
                                color="danger"
                                onPress={() => {
                                    const { [id]: _, ...rest } = segments;
                                    setSegments(rest);
                                }}
                            ><IconTrash/></Link>
                        }
                    />
                </li>
                : <ButtonGroup as="li" key={id} className="grid grid-cols-2 auto-cols-fr sm:flex w-full">
                    <Popover backdrop="opaque">
                        <PopoverTrigger>
                            <Button
                                variant="faded"
                                className="sm:min-w-64 order-1 sm:order-none !rounded-bl-none sm:!rounded-l-xl flex items-center justify-between"
                                endContent={<IconChevronDown/>}
                                startContent={segment.type == "text" ? <IconWriting/> : <IconListLetters/>}
                            >
                                <span className="flex items-center h-full gap-1 sm:gap-2">
                                    <IconCheck/>
                                    {segment.correctValues.length}
                                    {segment.wrongValues && <>
                                        <Divider orientation="vertical" className="h-2/3 ml-1"/>
                                        <IconX/>
                                        {segment.wrongValues.length}
                                    </>}
                                </span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            {(titleProps) => <div className="px-1 py-2 w-80 flex flex-col gap-2">
                                <h3 className="text-small font-bold" {...titleProps}>
                                    Gap details
                                </h3>
                                <Divider/>
                                <Select
                                    label="Gap type"
                                    selectedKeys={[segment.type]}
                                    onSelectionChange={value => value.currentKey && value.currentKey !== segment.type && setSegments({
                                        ...segments, [id]: {
                                            ...segment,
                                            type: value.currentKey as "text" | "choice",
                                            correctValues: ["Correct value"],
                                            wrongValues: value.currentKey === "choice" ? ["Wrong choice"] : undefined,
                                        },
                                    })}
                                >
                                    <SelectItem key="text" startContent={<IconWriting/>}>Text</SelectItem>
                                    <SelectItem key="choice" startContent={<IconListLetters/>}>Choice</SelectItem>
                                </Select>
                                <Divider/>
                                {segment.type === "text"
                                    ? <ul className="flex flex-col items-stretch">
                                        {segment.correctValues.map((value, i) => <Input
                                            key={i}
                                            aria-label={`Correct value ${i}`}
                                            value={value}
                                            variant="faded"
                                            color="success"
                                            className="group"
                                            classNames={{ inputWrapper: "group-first:rounded-t-xl rounded-none" }}
                                            onValueChange={value => setSegments({
                                                ...segments, [id]: {
                                                    ...segment,
                                                    correctValues: segment.correctValues.map((v, j) => j === i ? value : v),
                                                },
                                            })}
                                            endContent={
                                                <Link
                                                    href="#"
                                                    color="danger"
                                                    className="!rounded-l-none"
                                                    isDisabled={segment.correctValues.length === 1}
                                                    onPress={e => setSegments({
                                                        ...segments, [id]: {
                                                            ...segment,
                                                            correctValues: segment.correctValues.filter((_, j) => j !== i),
                                                        },
                                                    })}
                                                >
                                                    <IconTrash/>
                                                </Link>
                                            }
                                        />)}
                                        <Button
                                            isIconOnly
                                            variant="faded"
                                            className="!rounded-t-none !rounded-b-xl w-full flex !gap-2 items-center"
                                            startContent={<IconPlus/>}
                                            onPress={() => setSegments({
                                                ...segments, [id]: {
                                                    ...segment,
                                                    correctValues: [...segment.correctValues, "Correct value"],
                                                },
                                            })}
                                        >
                                            Add correct value
                                        </Button>
                                    </ul>
                                    : <>
                                        <ul className="flex flex-col items-stretch">
                                            {segment.correctValues.map((value, i) => <Input
                                                key={i}
                                                aria-label={`Correct value ${i}`}
                                                value={value}
                                                variant="faded"
                                                color="success"
                                                className="group"
                                                classNames={{ inputWrapper: "group-first:rounded-t-xl rounded-none" }}
                                                onValueChange={value => setSegments({
                                                    ...segments, [id]: {
                                                        ...segment,
                                                        correctValues: segment.correctValues.map((v, j) => j === i ? value : v),
                                                    },
                                                })}
                                                startContent={<Checkbox isSelected={true}/>}
                                                endContent={
                                                    <Link
                                                        href="#"
                                                        color="danger"
                                                        className="!rounded-l-none"
                                                        isDisabled={segment.correctValues.length === 1}
                                                        onPress={e => setSegments({
                                                            ...segments, [id]: {
                                                                ...segment,
                                                                correctValues: segment.correctValues.filter((_, j) => j !== i),
                                                            },
                                                        })}
                                                    >
                                                        <IconTrash/>
                                                    </Link>
                                                }
                                            />)}
                                            <Button
                                                isIconOnly
                                                variant="faded"
                                                className="!rounded-t-none !rounded-b-xl w-full flex !gap-2 items-center"
                                                startContent={<IconPlus/>}
                                                onPress={() => setSegments({
                                                    ...segments, [id]: {
                                                        ...segment,
                                                        correctValues: [...segment.correctValues, "Correct value"],
                                                    },
                                                })}
                                            >
                                                Add correct value
                                            </Button>
                                        </ul>
                                        <Divider/>
                                        <ul className="flex flex-col items-stretch">
                                            {segment.wrongValues?.map((value, i) => <Input
                                                key={i}
                                                aria-label={`Wrong value ${i}`}
                                                value={value}
                                                variant="faded"
                                                color="danger"
                                                className="group"
                                                classNames={{ inputWrapper: "group-first:rounded-t-xl rounded-none" }}
                                                onValueChange={value => setSegments({
                                                    ...segments, [id]: {
                                                        ...segment,
                                                        wrongValues: segment.wrongValues?.map((v, j) => j === i ? value : v),
                                                    },
                                                })}
                                                startContent={<Checkbox isSelected={false}/>}
                                                endContent={
                                                    <Link
                                                        href="#"
                                                        color="danger"
                                                        className="!rounded-l-none"
                                                        isDisabled={segment.wrongValues?.length === 1}
                                                        onPress={e => setSegments({
                                                            ...segments, [id]: {
                                                                ...segment,
                                                                wrongValues: segment.wrongValues?.filter((_, j) => j !== i),
                                                            },
                                                        })}
                                                    >
                                                        <IconTrash/>
                                                    </Link>
                                                }
                                            />)}
                                            <Button
                                                isIconOnly
                                                variant="faded"
                                                className="!rounded-t-none !rounded-b-xl w-full flex !gap-2 items-center"
                                                startContent={<IconPlus/>}
                                                onPress={() => setSegments({
                                                    ...segments, [id]: {
                                                        ...segment,
                                                        wrongValues: [...segment.wrongValues || [], "Wrong choice"],
                                                    },
                                                })}
                                            >
                                                Add wrong value
                                            </Button>
                                        </ul>
                                    </>
                                }
                            </div>}
                        </PopoverContent>
                    </Popover>
                    <Input
                        placeholder="Enter a hint... (optional)"
                        className="order-3 sm:order-none col-span-2 w-full"
                        classNames={{ inputWrapper: "rounded-t-none sm:rounded-none" }}
                        variant="bordered"
                        value={segment.hint}
                        onValueChange={value => setSegments({ ...segments, [id]: { ...segment, hint: value } })}
                    />
                    <Button
                        isIconOnly
                        color="danger"
                        variant="faded"
                        className="order-2 sm:order-none w-auto place-self-stretch !rounded-br-none sm:!rounded-r-xl"
                        onPress={() => {
                            const { [id]: _, ...rest } = segments;
                            setSegments(rest);
                        }}
                    ><IconTrash/></Button>
                </ButtonGroup>
            )}
        </ul>
        <br/>
        <ButtonGroup className="w-full">
            <Button
                className="flex-grow"
                size="lg"
                startContent={<IconRowInsertBottom/>}
                variant="faded"
                onPress={() => setSegments({
                    ...segments,
                    [Math.random()]: {
                        type: "text",
                        correctValues: ["Correct value"],
                    },
                    [Math.random()]: "write here",
                })}
            >
                Add gap
            </Button>
            <Button size="lg" variant="faded" startContent={<IconEye/>}>
                Preview
            </Button>
        </ButtonGroup>
    </div>;
}