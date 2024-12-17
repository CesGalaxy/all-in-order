"use client";

import { useParams } from "next/navigation";
import useNotebookVocabulary from "@/app/topics/[topicId]/notebook/_feature/reactivity/hooks/useNotebookVocabulary";

export default function useNbVocabArea() {
    const { encodedAreaName } = useParams<{ encodedAreaName?: string }>();
    const { areas } = useNotebookVocabulary();

    if (!encodedAreaName) throw new Error("No area name provided");

    const areaName = decodeURIComponent(encodedAreaName);

    return areas.find(area => area.name === areaName);
}