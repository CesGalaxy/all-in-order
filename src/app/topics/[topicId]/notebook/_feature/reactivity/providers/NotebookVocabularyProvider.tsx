"use client";

import { type ReactNode, useCallback, useEffect, useState } from "react";
import {
    NotebookVocabularyData,
    NotebookVocabularyDefinition
} from "@/app/topics/[topicId]/notebook/_feature/lib/db/NotebookVocabularyData";
import NotebookVocabularyContext
    from "@/app/topics/[topicId]/notebook/_feature/reactivity/context/NotebookVocabularyContext";
import { createSupabaseClient } from "@/supabase/client";
import useNotebook from "@/app/topics/[topicId]/notebook/_feature/reactivity/hooks/useNotebook";
import useActionFunction from "@/reactivity/hooks/useActionFunction";
import updateNotebookVocabulary from "@/app/topics/[topicId]/notebook/_feature/actions/updateNotebookVocabulary";
import { Modal, useDisclosure } from "@nextui-org/modal";
import NbAddDefinitionsModal from "@/app/topics/[topicId]/notebook/_feature/components/modals/NbAddDefinitionsModal";

const DEFAULT_VOCABULARY: NotebookVocabularyData = {
    definitions: {},
    areas: {}
}

export interface NotebookVocabularyProviderProps {
    initialVocabulary?: NotebookVocabularyData;
    userId: string;
    children?: ReactNode;
}

export default function NotebookVocabularyProvider({
                                                       children,
                                                       initialVocabulary,
                                                       userId
                                                   }: NotebookVocabularyProviderProps) {
    const { topicId } = useNotebook();
    const [data, setData] = useState<NotebookVocabularyData>(initialVocabulary || DEFAULT_VOCABULARY);

    const [loading, _, updateVocabulary] = useActionFunction(updateNotebookVocabulary.bind(null, topicId));

    const addDefinitions = useCallback((definitions: Record<string, NotebookVocabularyDefinition>) =>
            updateVocabulary({ ...data.definitions, ...definitions }),
        [data.definitions, updateVocabulary]);

    const addDefinitionsModalDisclosure = useDisclosure();

    useEffect(() => {
        const subscription = createSupabaseClient()
            .channel("notebook-" + topicId)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'nb_vocabulary',
                    filter: 'topic=eq.' + topicId + '&user=eq.' + userId
                },
                payload => {
                    console.log(payload);
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe()
                .then(() => console.log("Unsubscribed"))
                .catch(console.error);
        }
    }, [topicId, userId]);

    return <NotebookVocabularyContext.Provider value={{
        ...data,
        setData,
        addDefinitions,
        loading,
        showAddDefinitionsModal: addDefinitionsModalDisclosure.onOpen
    }}>
        {children}
        <Modal onOpenChange={addDefinitionsModalDisclosure.onOpenChange} isOpen={addDefinitionsModalDisclosure.isOpen}>
            <NbAddDefinitionsModal/>
        </Modal>
    </NotebookVocabularyContext.Provider>
}