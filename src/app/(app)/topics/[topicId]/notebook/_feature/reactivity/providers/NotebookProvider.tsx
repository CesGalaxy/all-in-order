"use client";

import { type ReactNode, useActionState, useCallback, useEffect, useOptimistic, useRef, useState } from "react";
import NotebookContext from "@/app/(app)/topics/[topicId]/notebook/_feature/reactivity/context/NotebookContext";
import createNotebookPage, {
    CreateNotebookPageResponse
} from "@/app/(app)/topics/[topicId]/notebook/_feature/actions/createNotebookPage";
import { FileObject } from "@supabase/storage-js";
import { Modal, useDisclosure } from "@nextui-org/modal";
import DeleteNotebookPageModal
    from "@/app/(app)/topics/[topicId]/notebook/_feature/components/modals/DeleteNotebookPageModal";
import NotebookVocabularyProvider
    from "@/app/(app)/topics/[topicId]/notebook/_feature/reactivity/providers/NotebookVocabularyProvider";
import { NotebookData } from "@/app/(app)/topics/[topicId]/notebook/_feature/lib/db/NotebookData";
import { Topic } from "@aio/db/entities";
import { toast } from "react-toastify";
import { createSupabaseClient } from "@/supabase/client";

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

    const [topic, setTopic] = useState<Topic>();
    const isRequestingTopicData = useRef(false);

    const [createPageState, createPageAction, isCreatingPage] =
        useActionState<CreateNotebookPageResponse | undefined, FormData>(createNotebookPage.bind(null, topicId), undefined);

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

    useEffect(() => {
        if (!topic && !isRequestingTopicData.current) {
            const QUERY_SUBJECT = "subject:subjects(id, name, course:courses(id, name))";
            const QUERY_PRACTICES = "practices(*, activities:topic_activities(count), attempts:practice_attempts(perfection))";

            isRequestingTopicData.current = true;

            createSupabaseClient()
                .from("topics")
                .select(`*, ${QUERY_SUBJECT}, ${QUERY_PRACTICES}`)
                .limit(10, { referencedTable: 'practices.practice_attempts' })
                .eq("id", topicId)
                .maybeSingle()
                .then(({ data, error }) => {
                    console.log(data, error);
                    if (data) setTopic(data);
                    if (error) toast.error("Failed to load topic data");
                });
        }
    }, [topic, topicId])

    return <NotebookContext.Provider value={{
        pages,
        optimisticPage,
        refreshingPages: false,
        refreshPages: async () => [],
        createPage,
        createPageState,
        isCreatingPage,
        deletePage,
        topic,
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