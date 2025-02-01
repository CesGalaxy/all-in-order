"use client";

import { type ReactNode, useEffect, useState } from "react";
import NotebookVocabularyContext from "@/modules/notebook/vocabulary/reactivity/context/NotebookVocabularyContext";
import { createSupabaseClient } from "@/lib/supabase/client";
import useNotebook from "@/modules/notebook/app/reactivity/hooks/useNotebook";
import useActionFunction from "@/reactivity/hooks/useActionFunction";
import { Modal, useDisclosure } from "@heroui/modal";
import NbAddDefinitionsModal from "@/modules/notebook/vocabulary/components/modals/NbAddDefinitionsModal";
import { NotebookVocabularyAreaData } from "@/modules/notebook/app/supabase/db/NotebookData";
import {
    addNotebookVocabularyAreas,
    addNotebookVocabularyDefinitions
} from "@/modules/notebook/vocabulary/actions/vocabulary";
import NbAddAreasModal from "@/modules/notebook/vocabulary/components/modals/NbAddAreasModal";

export interface NotebookVocabularyProviderProps {
    initialVocabularyAreas: NotebookVocabularyAreaData[];
    userId: string;
    children?: ReactNode;
}

export default function NotebookVocabularyProvider({
                                                       children,
                                                       initialVocabularyAreas,
                                                       userId
                                                   }: NotebookVocabularyProviderProps) {
    const { topicId, entity: { id: notebookId } } = useNotebook();
    const [areas, setAreas] = useState<NotebookVocabularyAreaData[]>(initialVocabularyAreas);

    // Definitions -> Add
    const addDefinitionsState = useActionFunction(addNotebookVocabularyDefinitions);
    const addDefinitionsModalDisclosure = useDisclosure();

    // Areas -> Add
    const addAreasState = useActionFunction(addNotebookVocabularyAreas.bind(null, notebookId));
    const addAreasModalDisclosure = useDisclosure();

    useEffect(() => {
        const subscription = createSupabaseClient()
            .channel("notebook-" + topicId)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'nb_vocab_areas',
                    filter: 'notebook=eq.' + notebookId,
                },
                payload => console.log(payload)
            )
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'nb_vocab_definitions',
                    filter: 'notebook=eq.' + notebookId,
                },
                payload => console.log(payload)
            )
            .subscribe();

        return () => {
            subscription.unsubscribe()
                .then(() => console.log("Unsubscribed"))
                .catch(console.error);
        }
    }, [notebookId, topicId, userId]);

    return <NotebookVocabularyContext.Provider value={{
        areas,
        setAreas,
        addDefinitionsState,
        addAreasState,
        showAddDefinitionsModal: addDefinitionsModalDisclosure.onOpen,
        showAddAreasModal: addAreasModalDisclosure.onOpen
    }}>
        {children}
        <Modal onOpenChange={addDefinitionsModalDisclosure.onOpenChange} isOpen={addDefinitionsModalDisclosure.isOpen}>
            <NbAddDefinitionsModal/>
        </Modal>
        <Modal onOpenChange={addAreasModalDisclosure.onOpenChange} isOpen={addAreasModalDisclosure.isOpen}>
            <NbAddAreasModal/>
        </Modal>
    </NotebookVocabularyContext.Provider>
}