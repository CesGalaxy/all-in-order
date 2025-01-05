import NotebookPageProvider from "@/modules/notebook/pages/reactivity/providers/NotebookPageProvider";
import NbPageNavbar from "@/modules/notebook/pages/components/navigation/NbPageNavbar";
import NbPageEditor from "@/modules/notebook/pages/app/NbPageEditor";
import type { Camelize, FileObjectV2 } from "@supabase/storage-js";
import NbPageFAB from "@/modules/notebook/pages/components/navigation/NbPageFAB";
import NotebookPageData from "@/modules/notebook/app/supabase/storage/NotebookPageData";

export interface NbPageEditTemplateProps {
    data: NotebookPageData,
    file: Camelize<FileObjectV2>;
    path: string;
}

export default function NbPageEditTemplate({ data, file, path }: NbPageEditTemplateProps) {
    return <NotebookPageProvider
        initialData={data}
        path={path}
    >
        <div className="w-full h-full flex flex-col items-stretch relative">
            <NbPageNavbar file={file} path={path}/>
            {/*<p className="p-4 text-lg">*/}
            {/*    Reading page <b>{fileName}</b> from the notebook of the topic with ID={topicId}...*/}
            {/*</p>*/}
            <NbPageEditor/>
            <NbPageFAB/>
        </div>
    </NotebookPageProvider>

}