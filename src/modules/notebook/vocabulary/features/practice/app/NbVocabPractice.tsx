"use client";

import useNbVocabPractice from "@/modules/notebook/vocabulary/features/practice/reactivity/hooks/useNbVocabPractice";
import PageContainer from "@/components/containers/PageContainer";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NbVocabPractice() {
    const {
        currentDefinitionIndex,
        currentDefinition: { term, definition },
        nextDefinition,
        prevDefinition
    } = useNbVocabPractice();

    const [show, setShow] = useState(false);
    useEffect(() => setShow(false), [currentDefinitionIndex]);
    const router = useRouter();

    return <PageContainer className="flex-grow h-full flex flex-col items-center gap-8 justify-center">
        <Button onPress={() => router.back()} className="absolute top-16 left-0 w-full" radius="none">
            Back</Button>
        <Card isPressable onPress={() => setShow(!show)} className="w-full max-w-96">
            <CardHeader className="text-lg font-medium">{term}</CardHeader>
            <AnimatePresence>
                <CardBody
                    className="min-h-32 items-center justify-center relative"
                    // as={motion.div}
                    // key={currentDefinitionIndex * Number(show)}
                    // initial={{ opacity: 0 }}
                    // animate={{ opacity: 1 }}
                    // exit={{ opacity: 0 }}
                >
                    {show
                        ? definition
                        : <p className="text-default">Click to reveal definition</p>}
                </CardBody>
            </AnimatePresence>
        </Card>
        <ButtonGroup variant="faded">
            <Button onPress={prevDefinition}>Prev</Button>
            <Button onPress={nextDefinition}>Next</Button>
        </ButtonGroup>
    </PageContainer>
}