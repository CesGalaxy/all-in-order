import { createContext } from "react";
import { CreateNotebookPageResponse } from "@/app/topics/[topicId]/notebook/_feature/actions/createNotebookPage";
import { FileObject } from "@supabase/storage-js";

export interface NotebookContextData {
    pages: FileObject[];
    optimisticPage?: string;
    refreshingPages: boolean;
    refreshPages: () => Promise<string[]>;
    createPage: (formData: FormData) => void;
    createPageState?: CreateNotebookPageResponse;
    isCreatingPage: boolean;
    deletePage: (name: string) => void;
    topicId: number | string;
}

const NotebookContext = createContext<NotebookContextData | null>(null);

export default NotebookContext;