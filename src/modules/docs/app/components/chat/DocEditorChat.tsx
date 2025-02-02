"use client";

import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { IconHelp, IconHistory, IconPlus, IconSend, IconSettings } from "@tabler/icons-react";
import { useChat } from "ai/react";
import { Alert } from "@heroui/alert";
import { usePathname } from "next/navigation";
import { Tooltip } from "@heroui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";

function DocEditorChat() {
    const pathname = usePathname();
    const { messages, input, handleInputChange, handleSubmit, error } = useChat({
        api: pathname.replace("edit", "api/chat"),
        onError: (error) => console.error(error),
    });

    return <div
        className="w-full lg:w-96 shrink-0 flex flex-col gap-2 p-2 lg:sticky top-0 lg:flex-col justify-between items-center lg:h-dvh z-50 bg-background">
        <ul className="flex items-center gap-x-4" role="navigation">
            <Tooltip content="New conversation">
                <li>
                    <Button variant="flat"><IconPlus/></Button>
                </li>
            </Tooltip>
            <Popover>
                <Tooltip content="Conversation history">
                    <li>
                        <PopoverTrigger>
                            <Button variant="flat"><IconHistory/></Button>
                        </PopoverTrigger>
                    </li>
                </Tooltip>
                <PopoverContent className="h-32 w-64">
                    <p className="text-3xl font-bold bg-clip-text bg-gradient-to-tr from-pink-500 to-yellow-500 text-transparent">
                        Coming soon!
                    </p>
                </PopoverContent>
            </Popover>
            <Tooltip content="Settings">
                <li>
                    <Button variant="flat"><IconSettings/></Button>
                </li>
            </Tooltip>
            <Tooltip content="Help">
                <li>
                    <Button variant="flat"><IconHelp/></Button>
                </li>
            </Tooltip>
        </ul>
        <div className="w-full p-4 grow space-y-2 bg-content2 rounded-xl overflow-y-scroll scrollbar-hide">
            {messages.map((message, i) => (
                <div key={message.id}>
                    <b>{message.role.toUpperCase()}</b>
                    <p>{message.content}</p>
                </div>
            ))}
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
            <Textarea
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message here"
                className="w-full"
                endContent={<Button isIconOnly color="primary" type="submit"><IconSend/></Button>}
                name="prompt"
            />
        </form>
        {error && <Alert color="danger" title={error.name} isClosable className="max-h-fit">{error.message}</Alert>}
    </div>
}

// function AIMessage({ content }: { content: string }) {
//     // The message is a string with the syntax: <think>{THINKING}</think>{MESSAGE}
//     const thinking = content.match(/^<think>(.*)<\/think>/s)?.[1];
//     const message = thinking ? content.replace(/^<think>.*<\/think>/s, "") : undefined;
//     const [open, setOpen] = useState();
//
//     return <>
//         <Popover>
//             <PopoverTrigger>
//                 <blockquote className="text-default-500 italic text-sm truncate hover:underline cursor-pointer">
//                     {thinking || content.replace("<think>", "")}
//                 </blockquote>
//             </PopoverTrigger>
//             <PopoverContent>
//                 <p>{thinking || content.replace("<think>", "")}</p>
//             </PopoverContent>
//         </Popover>
//         {message && <p>{message}</p>}
//     </>
// }

export default DocEditorChat;