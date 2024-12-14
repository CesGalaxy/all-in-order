import NotebookPageProvider from "@/app/topics/[topicId]/notebook/_feature/reactivity/providers/NotebookPageProvider";
import NbPageNavbar from "@/app/topics/[topicId]/notebook/_feature/components/navigation/NbPageNavbar";
import NbPageEditor from "@/app/topics/[topicId]/notebook/_feature/app/NbPageEditor";
import type { Camelize, FileObjectV2 } from "@supabase/storage-js";
import NbPageFAB from "@/app/topics/[topicId]/notebook/_feature/components/navigation/NbPageFAB";
import NotebookPageData from "@/app/topics/[topicId]/notebook/_feature/lib/storage/NotebookPageData";

export interface NbPageEditTemplateProps {
    data: NotebookPageData,
    saveAction: (content: NotebookPageData) => Promise<boolean>,
    file: Camelize<FileObjectV2>
}

export default function NbPageEditTemplate({ data, saveAction, file }: NbPageEditTemplateProps) {
    return <NotebookPageProvider
        initialData={data}
        saveAction={saveAction}
    >
        <div className="w-full h-full flex flex-col items-stretch relative">
            <NbPageNavbar file={file}/>
            {/*<p className="p-4 text-lg">*/}
            {/*    Reading page <b>{fileName}</b> from the notebook of the topic with ID={topicId}...*/}
            {/*</p>*/}
            <NbPageEditor/>
            <NbPageFAB/>
        </div>
    </NotebookPageProvider>

}