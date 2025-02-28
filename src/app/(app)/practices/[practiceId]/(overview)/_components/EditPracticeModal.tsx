"use client";

import { ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { TopicActivity } from "@/lib/supabase/entities";
import { Button, ButtonGroup } from "@heroui/button";
import { IconChevronUp, IconCopy, IconEdit, IconPlus, IconPrinter, IconTrash } from "@tabler/icons-react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Tooltip } from "@heroui/tooltip";
import { Alert } from "@heroui/alert";
import QuestionSolutionButton from "@/app/(app)/@aside/(.)practices/[practiceId]/_QuestionSolutionButton";
import ModalButton from "@/components/utils/ModalButton";
import EditPracticeActivityModal from "@/collections/practiceActivity/components/modals/EditPracticeActivityModal";
import createPracticeActivity, { updatePracticeActivity } from "@/collections/practiceActivity/actions";
import { Divider } from "@heroui/divider";
import CreatePracticeActivityModal from "@/collections/practiceActivity/CreatePracticeActivityModal";
import {
    Question,
    QUESTION_ATTEMPT_GENERATORS,
    QUESTION_ICONS,
    QUESTION_PREVIEWS,
    QuestionType
} from "@/modules/learn/question";

export interface EditPracticeModalProps {
    details: {
        id: number;
        title: string;
        description?: string;
    };
    activities: TopicActivity[];
    topicId: number;
}

export default function EditPracticeModal({ details, activities, topicId }: EditPracticeModalProps) {
    const QuestionIcon = ({ type, className }: { type: QuestionType, className?: string }) => {
        const Icon = QUESTION_ICONS[type];
        return <Icon className={className}/>;
    }

    const PreviewQuestion = <T extends QuestionType, >({ data }: { data: Question<T> }) => {
        const Preview = QUESTION_PREVIEWS[data.type];
        // @ts-ignore
        return <Preview attempt={QUESTION_ATTEMPT_GENERATORS[data.type](data)}/>;
    }

    return <ModalContent>{onClose => <>
        <ModalHeader>{details.title}</ModalHeader>
        <ModalBody className="grid lg:grid-cols-2">
            <Card>
                <CardHeader className="font-bold text-xl">Practice details</CardHeader>
                <CardBody>
                    <div>
                        <Alert title="Work in progress!" description="Some features may not be avaliable yet."
                               color="warning"/>
                    </div>
                    <p>{details.description}</p>
                </CardBody>
                <CardFooter className="">#{details.id}</CardFooter>
            </Card>
            <ul className="flex flex-col items-stretch gap-4">
                {activities.map(({ id, data, tags, created_at, updated_at }: any) => <Card as="li" key={id}>
                    <CardHeader className="items-start gap-4">
                        <div className="w-full flex-grow">
                            <div className="flex items-center gap-2">
                                <Tooltip content={data.type.replaceAll('_', ' ').toUpperCase()}>
                                    <QuestionIcon type={data.type} className="hidden xl:block"/>
                                </Tooltip>
                                <h1 className="text-xl font-medium">{data.title}</h1>
                            </div>
                            {data.details && <p className="text-sm text-gray-500">{data.details}</p>}
                        </div>
                        <ButtonGroup>
                            <QuestionSolutionButton data={data}/>
                            <Tooltip content="Edit question">
                                <ModalButton
                                    modal={<EditPracticeActivityModal
                                        action={updatePracticeActivity.bind(null, topicId, id)}
                                        initialData={data}
                                        initialTags={tags}
                                    />}
                                    isIconOnly
                                    variant="flat"
                                    modalProps={{ size: "xl" }}
                                >
                                    <IconEdit/>
                                </ModalButton>
                            </Tooltip>
                            <Tooltip content="Delete">
                                <Button isIconOnly variant="flat" color="danger">
                                    <IconTrash/>
                                </Button>
                            </Tooltip>
                        </ButtonGroup>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <PreviewQuestion data={data as any}/>
                    </CardBody>
                    <CardFooter
                        className="text-xs text-default-500 uppercase gap-8 *:flex *items-center *:gap-1"
                    >
                        <p>
                            <span>Created at</span>
                            <b>{created_at.slice(0, 10)}</b>
                        </p>
                        <p>
                            <span>Last update at</span>
                            <b>{updated_at?.slice(0, 10) || "-/-/-"}</b>
                        </p>
                    </CardFooter>
                </Card>)}
                <ul>
                    <ModalButton
                        color="primary"
                        startContent={<IconPlus/>}
                        modal={<CreatePracticeActivityModal
                            action={createPracticeActivity.bind(null, topicId, details.id)}/>}
                        modalProps={{ size: "xl" }}
                    >Add a new activity</ModalButton>
                </ul>
            </ul>
        </ModalBody>
        <ModalFooter>
            <Button onPress={onClose}>Cancel</Button>
            <ButtonGroup color="primary">
                <Button>Save</Button>
                <Dropdown>
                    <DropdownTrigger>
                        <Button isIconOnly><IconChevronUp/></Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem key="save_copy" startContent={<IconCopy/>}
                        >Save a copy</DropdownItem>
                        <DropdownItem key="save_print" startContent={<IconPrinter/>}
                        >Save and print</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </ButtonGroup>
        </ModalFooter>
    </>}</ModalContent>
}