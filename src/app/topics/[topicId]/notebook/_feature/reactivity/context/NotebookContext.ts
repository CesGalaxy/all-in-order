import { createContext } from "react";
import { CreateNotebookPageResponse } from "@/app/topics/[topicId]/notebook/_feature/actions/createNotebookPage";
import { FileObject } from "@supabase/storage-js";
import { NotebookEntity } from "@/app/topics/[topicId]/notebook/_feature/lib/db/NotebookData";
import { Topic } from "@aio/db/entities";

export interface NotebookContextData {
    pages: FileObject[];
    optimisticPage?: string;
    refreshingPages: boolean;
    refreshPages: () => Promise<string[]>;
    createPage: (formData: FormData) => void;
    createPageState?: CreateNotebookPageResponse;
    isCreatingPage: boolean;
    deletePage: (name: string) => void;
    topicId: number;
    topic?: Topic;
    entity: NotebookEntity;
}

const NotebookContext = createContext<NotebookContextData | null>(null);

export default NotebookContext;