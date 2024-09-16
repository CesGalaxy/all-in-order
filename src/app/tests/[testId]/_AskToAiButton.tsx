"use client";

import { Button, ButtonGroup } from "@nextui-org/button";
import {
    IconChevronDown,
    IconMessageCog,
    IconMessagePlus,
    IconPaperclip,
    IconPlayerStopFilled,
    IconSend,
    IconShare,
    IconSparkles,
    IconTextPlus
} from "@tabler/icons-react";
import { TopicTestWQuestions } from "@/supabase/models/TopicTest";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { useChat } from "ai/react";
import { useRef } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";

export default function AskToAIButton({ test }: { test: TopicTestWQuestions }) {
    const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
        api: `/api/ai/chat`,
    });

    const { isOpen, onOpen, onOpenChange } = useDisclosure({
        onOpen: () => setTimeout(() => textInputRef.current?.focus(), 10)
    });

    const textInputRef = useRef<HTMLInputElement>(null);

    return <>
        <ButtonGroup>
            <Button startContent={<IconSparkles/>} onClick={onOpen}>Ask to AI</Button>
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <Button isIconOnly><IconChevronDown/></Button>
                </DropdownTrigger>
                <DropdownMenu>
                    <DropdownItem startContent={<IconTextPlus/>}>Create questions</DropdownItem>
                    <DropdownItem startContent={<IconMessagePlus/>}>Open chat</DropdownItem>
                    <DropdownItem startContent={<IconShare/>}>Share context</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </ButtonGroup>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}
               size="xl">
            <ModalContent>
                {(onClose) => <>
                    <ModalHeader className="text-xl flex flex-col gap-1">Chat with AI</ModalHeader>
                    <ModalBody className="bg-content2">
                        <div className="h-[60vh] w-full flex flex-col overflow-auto gap-2">
                            {messages.map(m => (
                                <div
                                    key={m.id}
                                    className={"whitespace-pre-wrap rounded-xl w-fit max-w-96 px-4 py-2 " + (
                                        m.role === 'user'
                                            ? 'text-right self-end bg-primary-400 text-background'
                                            : 'bg-default'
                                    )}
                                >
                                    {/*{m.role === 'user' ? 'User: ' : 'AI: '}*/}
                                    {m.content}
                                </div>
                            ))}
                        </div>
                    </ModalBody>
                    <ModalFooter className="flex items-center w-full">
                        {isLoading
                            ? <Button isIconOnly color="danger" variant="faded" onClick={stop}>
                                <IconPlayerStopFilled/>
                            </Button>
                            : <Button isIconOnly variant="light">
                                <IconPaperclip/>
                            </Button>
                        }
                        <form onSubmit={handleSubmit} className="flex items-center w-full flex-grow gap-2">
                            <Input
                                placeholder="Chat with AI..."
                                variant="faded"
                                className="flex-grow w-full"
                                value={input}
                                onChange={handleInputChange}
                                autoComplete="off"
                                ref={textInputRef}
                            />
                            <Button color="primary" isLoading={isLoading} isIconOnly type="submit">
                                <IconSend/>
                            </Button>
                        </form>
                        <Button isIconOnly>
                            <IconMessageCog/>
                        </Button>
                    </ModalFooter>
                </>}
            </ModalContent>
        </Modal>
    </>;
}