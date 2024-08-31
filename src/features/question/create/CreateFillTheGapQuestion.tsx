"use client";

import { useQuestionCreationContext } from "@/features/question/QuestionCreationContext";
import { useEffect, useMemo, useState } from "react";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { FillTheGapQuestionGap, FillTheGapQuestionSegment } from "@/features/question/questions/FillTheGapQuestion";
import { IconCheck, IconPlus, IconTrash, IconX } from "@tabler/icons-react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Link } from "@nextui-org/link";

export default function CreateFillTheGapQuestion({ title }: { title: string }) {
    const { setQuestion } = useQuestionCreationContext();

    const [segments, setSegments] = useState<FillTheGapQuestionSegment[]>(["This is an", { type: "text", answers: ["example"] }, "question."]);

    useEffect(() => setQuestion(segments.length ? {
        title,
        type: "fill_the_gap",
        segments
    } : undefined), [title, segments, setQuestion]);

    return <div className="flex flex-col gap-4">
        {segments.map((segment, i) => typeof segment === "string"
            ? <div key={i} className="flex items-stretch gap-4">
                <Input key={i} value={segment} placeholder="Text" onChange={e => {
                    const newSegments = [...segments];
                    newSegments[i] = e.target.value.trimStart();
                    setSegments(newSegments);
                }}/>
                <Button color="danger" isIconOnly onClick={() => {
                    const newSegments = [...segments];
                    newSegments.splice(i, 1);
                    setSegments(newSegments);
                }}>
                    <IconTrash />
                </Button>
            </div>
            : <div key={i} className="flex items-stretch gap-4">
                <Select
                    aria-label="Gap type"
                    className="max-w-32"
                    selectedKeys={[segment.type]}
                    onChange={e => {
                        const newSegments = [...segments];
                        newSegments[i] = {
                            type: e.target.value,
                            [e.target.value == "text" ? 'answers' : 'choices']: []
                        } as unknown as FillTheGapQuestionGap;
                        setSegments(newSegments);
                    }}
                >
                    <SelectItem key="text" value="text">Text</SelectItem>
                    <SelectItem key="choice" value="choice">Choice</SelectItem>
                </Select>
                {segment.type === "text" && <Popover backdrop="opaque">
                    <PopoverTrigger>
                        <Button className="w-full">
                            {segment.answers.length} answers
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        {(titleProps) => (
                            <div className="px-1 py-2 w-full">
                                <p className="text-small font-bold text-foreground" {...titleProps}>
                                    Valid answers
                                </p>
                                <div className="mt-2 flex flex-col gap-2 w-full">
                                    {segment.answers.map((answer, j) => <Input
                                        key={j}
                                        defaultValue={answer}
                                        size="sm"
                                        variant="bordered"
                                        placeholder="Answer"
                                        endContent={<Link
                                            as={"button"}
                                            color="danger"
                                            onClick={() => {
                                                const newSegments = [...segments];
                                                (newSegments[i] as any).answers.splice(j, 1);
                                                setSegments(newSegments);
                                            }}
                                        >
                                            <IconTrash />
                                        </Link>}
                                        onChange={e => {
                                            const newSegments = [...segments];
                                            (newSegments[i] as any).answers[j] = e.target.value;
                                            setSegments(newSegments);
                                        }}
                                    />)}
                                    <Button
                                        color="primary"
                                        size="sm"
                                        startContent={<IconPlus />}
                                        onClick={() => {
                                            const newSegments = [...segments];
                                            (newSegments[i] as any).answers.push("answer");
                                            setSegments(newSegments);
                                        }}
                                    >
                                        Add answer
                                    </Button>
                                </div>
                            </div>
                        )}
                    </PopoverContent>
                </Popover>}
                {segment.type === "choice" && <Popover backdrop="opaque">
                    <PopoverTrigger>
                        <Button className="w-full">
                            {segment.choices.length} choices
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        {(titleProps) => (
                            <div className="px-1 py-2 w-full">
                                <p className="text-small font-bold text-foreground" {...titleProps}>
                                    Choices
                                </p>
                                <div className="mt-2 flex flex-col gap-2 w-full">
                                    {segment.choices.map(([choice, correct], j) => <Input
                                        key={j}
                                        defaultValue={choice}
                                        size="sm"
                                        variant="bordered"
                                        placeholder="Choice"
                                        startContent={<Link
                                            as={"button"}
                                            color={correct ? "success" : "danger"}
                                            onClick={() => {
                                                const newSegments = [...segments];
                                                (newSegments[i] as any).choices[j] = [choice, !correct];
                                                setSegments(newSegments);
                                            }}
                                        >
                                            {correct ? <IconCheck /> : <IconX />}
                                        </Link>}
                                        endContent={<Link
                                            as={"button"}
                                            color="danger"
                                            onClick={() => {
                                                const newSegments = [...segments];
                                                (newSegments[i] as any).choices.splice(j, 1);
                                                setSegments(newSegments);
                                            }}
                                        >
                                            <IconTrash />
                                        </Link>}
                                        onChange={e => {
                                            const newSegments = [...segments];
                                            (newSegments[i] as any).choices[j] = [e.target.value, correct];
                                            setSegments(newSegments);
                                        }}
                                    />)}
                                    <Button
                                        color="primary"
                                        size="sm"
                                        startContent={<IconPlus />}
                                        onClick={() => {
                                            const newSegments = [...segments];
                                            (newSegments[i] as any).choices.push(["choice", false]);
                                            setSegments(newSegments);
                                        }}
                                    >
                                        Add choice
                                    </Button>
                                </div>
                            </div>
                        )}
                    </PopoverContent>
                </Popover>}
                <Button color="danger" isIconOnly onClick={() => {
                    const newSegments = [...segments];
                    newSegments.splice(i, 1);
                    setSegments(newSegments);
                }}>
                    <IconTrash />
                </Button>
            </div>
        )}
        <div className="grid grid-cols-2 gap-4">
            <Button color="primary" onClick={() => setSegments([...segments, ""])}>
                Add text
            </Button>
            <Button color="primary" onClick={() => setSegments([...segments, { type: "text", answers: [] }])}>
                Add gap
            </Button>
        </div>
    </div>;
}