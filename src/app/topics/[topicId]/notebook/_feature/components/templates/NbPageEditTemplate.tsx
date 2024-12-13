import { JSONContent } from "novel";
import NotebookPageProvider from "@/app/topics/[topicId]/notebook/_feature/reactivity/providers/NotebookPageProvider";
import NbPageNavbar from "@/app/topics/[topicId]/notebook/_feature/components/navigation/NbPageNavbar";
import NbPageEditor from "@/app/topics/[topicId]/notebook/_feature/app/NbPageEditor";
import type { Camelize, FileObjectV2 } from "@supabase/storage-js";
import { Button } from "@nextui-org/button";
import { IconCategory } from "@tabler/icons-react";

export interface NbPageEditTemplateProps {
    content: JSONContent,
    saveAction: (content: JSONContent) => Promise<boolean>,
    file: Camelize<FileObjectV2>
}

export default function NbPageEditTemplate({ content, saveAction, file }: NbPageEditTemplateProps) {
    return <NotebookPageProvider
        initialContent={content}
        saveAction={saveAction}
    >
        <div className="w-full h-full flex flex-col items-stretch relative">
            <NbPageNavbar file={file}/>
            {/*<p className="p-4 text-lg">*/}
            {/*    Reading page <b>{fileName}</b> from the notebook of the topic with ID={topicId}...*/}
            {/*</p>*/}
            <NbPageEditor/>
            <Button isIconOnly size="lg" radius="full" className="absolute bottom-4 right-4" variant="light">
                <IconCategory/>
            </Button>
        </div>
    </NotebookPageProvider>

}