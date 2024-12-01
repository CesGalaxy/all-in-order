"use client";

import { useTranslations } from "next-intl";
import SectionContainer from "@/components/containers/SectionContainer";
import NoDocuments from "@/collections/docs/components/views/NoDocuments";
import DocsVisibilityFilter from "@/app/topics/[topicId]/(hub)/_components/navigation/filter/DocsVisibilityFilter";
import { useState } from "react";
import ModalButton from "@/components/utils/ModalButton";
import { IconFilePlus, IconFilter, IconUpload } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { TopicDocumentObject } from "@/supabase/storage/query/getTopicDocuments";
import { AnimatePresence, motion } from "framer-motion";
import DocumentCard from "@/collections/docs/components/navigation/DocumentCard";
import CreateDocModal from "@/collections/docs/components/modals/CreateDocModal";
import { Tab, Tabs } from "@nextui-org/tabs";

export interface TopicRecentDocsSectionProps {
    privDocs: TopicDocumentObject[];
    pubDocs: TopicDocumentObject[];
    topicId: number;
}

const VIEW_MODES_CLASSNAMES = {
    "grid": "grid sm:grid-cols-2 gap-4",
    "list": "flex flex-col items-stretch gap-4",
}

export default function TopicRecentDocsSection({ privDocs, pubDocs, topicId }: TopicRecentDocsSectionProps) {
    const t = useTranslations();

    const [filter, setFilter] = useState<"all" | "public" | "private">("all");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const filteredDocs = filter === "all"
        ? [...pubDocs, ...privDocs]
        : filter === "public"
            ? pubDocs
            : privDocs;

    return <SectionContainer
        title={t("App.documents")}
        expanded
        className="flex-grow"
        trailing={<nav className="flex items-center gap-1 flex-wrap">
            <ModalButton modal={<CreateDocModal action={topicId}/>} isIconOnly size="sm" variant="light"
                         color="primary">
                <IconFilePlus/>
            </ModalButton>
            <ModalButton modal={<p></p>} isIconOnly size="sm" variant="light" color="primary">
                <IconUpload/>
            </ModalButton>
            <Popover placement="bottom-end">
                <PopoverTrigger>
                    <Button size="sm" variant="flat" color="primary" className="hidden xl:flex"
                            startContent={<IconFilter/>}>
                        Filter
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col items-stretch gap-2">
                    <DocsVisibilityFilter filter={filter} setFilter={setFilter}/>
                    <Tabs
                        selectedKey={viewMode}
                        onSelectionChange={setViewMode as any}
                        className="w-full"
                        size="sm"
                    >
                        <Tab key="grid" title="Grid"/>
                        <Tab key="list" title="List"/>
                    </Tabs>
                </PopoverContent>
            </Popover>
            <nav className="xl:hidden"><DocsVisibilityFilter filter={filter} setFilter={setFilter}/></nav>
        </nav>}
    >
        {privDocs.length === 0
            ? <NoDocuments topicId={topicId}/>
            : <ul className={VIEW_MODES_CLASSNAMES[viewMode]}>
                <AnimatePresence initial={false}>
                    {filteredDocs.map(doc => <DocumentCard
                        key={doc.id}
                        as={motion.li}
                        shadow="none"
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        doc={doc}
                        topicId={topicId}
                    />)}
                </AnimatePresence>
            </ul>
        }
    </SectionContainer>;
}