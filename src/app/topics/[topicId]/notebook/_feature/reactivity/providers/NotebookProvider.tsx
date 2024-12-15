"use client";

import { type ReactNode, useActionState, useCallback, useOptimistic, useState } from "react";
import NotebookContext from "@/app/topics/[topicId]/notebook/_feature/reactivity/context/NotebookContext";
import createNotebookPage, {
    CreateNotebookPageResponse
} from "@/app/topics/[topicId]/notebook/_feature/actions/createNotebookPage";
import { FileObject } from "@supabase/storage-js";
import { Modal, useDisclosure } from "@nextui-org/modal";
import DeleteNotebookPageModal
    from "@/app/topics/[topicId]/notebook/_feature/components/modals/DeleteNotebookPageModal";
import NotebookVocabularyProvider
    from "@/app/topics/[topicId]/notebook/_feature/reactivity/providers/NotebookVocabularyProvider";
import { NotebookData } from "@/app/topics/[topicId]/notebook/_feature/lib/db/NotebookData";

export interface PagesOptimistic {
    pages: FileObject[],
    optimisticPage?: string
}

export interface NotebookProviderProps {
    topicId: number;
    initialData: NotebookData;
    initialPages?: FileObject[];
    userId: string;
    children: ReactNode;
}

export default function NotebookProvider({
                                             children,
                                             initialData: { areas: initialVocabularyAreas, ...initialData },
                                             initialPages,
                                             topicId,
                                             userId,
                                         }: NotebookProviderProps) {
    const [{ pages, optimisticPage }, addOptimisticPage] = useOptimistic<PagesOptimistic, string>(
        { pages: initialPages ?? [] },
        (state, title) => ({
            ...state,
            optimisticPage: title
        }),
    );

    const [createPageState, createPageAction, isCreatingPage] =
        useActionState<CreateNotebookPageResponse | undefined, FormData>(createNotebookPage.bind(null, 9), undefined);

    const [deleteModalSelected, setDeleteModalSelected] = useState<string>();
    const deleteModalDisclosure = useDisclosure();

    const createPage = useCallback((formData: FormData) => {
        addOptimisticPage(formData.get("aio-nb-page-name")?.toString().trim() || "New page");
        return createPageAction(formData);
    }, [addOptimisticPage, createPageAction]);

    const deletePage = useCallback((name: string) => {
        setDeleteModalSelected(name);
        deleteModalDisclosure.onOpen();
    }, [deleteModalDisclosure]);

    return <NotebookContext.Provider value={{
        pages,
        optimisticPage,
        refreshingPages: false,
        refreshPages: async () => [],
        createPage,
        createPageState,
        isCreatingPage,
        deletePage,
        topicId,
        // TODO: Add realtime updates
        entity: initialData,
    }}>
        <NotebookVocabularyProvider initialVocabularyAreas={initialVocabularyAreas} userId={userId}>
            {children}
            {deleteModalSelected &&
                <Modal isOpen={deleteModalDisclosure.isOpen} onOpenChange={deleteModalDisclosure.onOpenChange}>
                    <DeleteNotebookPageModal topicId={topicId} name={deleteModalSelected}/>
                </Modal>}
        </NotebookVocabularyProvider>
    </NotebookContext.Provider>
}