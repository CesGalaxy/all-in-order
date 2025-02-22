"use server";

import SectionContainer from "@/components/containers/SectionContainer";
import NoDocuments from "@/collections/docs/components/views/NoDocuments";
import ModalButton from "@/components/utils/ModalButton";
import { IconFilePlus, IconUpload } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import DocumentCard from "@/collections/docs/components/navigation/DocumentCard";
import CreateDocModal from "@/collections/docs/components/modals/CreateDocModal";
import { getTranslations } from "next-intl/server";
import ErrorView from "@/components/views/ErrorView";
import { getAllTopicDocs } from "@/collections/docs/query";
import getSupabase from "@/lib/supabase/server";
import { FileObject, StorageError } from "@supabase/storage-js";
import type { ReactNode } from "react";

export interface TopicRecentDocsSectionProps {
    topicId: number;
}

const VIEW_MODES_CLASSNAMES = {
    "grid": "grid sm:grid-cols-2 gap-4",
    "list": "flex flex-col items-stretch gap-4",
}

export default async function TopicRecentDocsSection({ topicId }: TopicRecentDocsSectionProps) {
    const t = await getTranslations();

    const { data, error } = await getAllTopicDocs(topicId);

    if (error) return <ErrorView message={error.message}/>;

    const Wrapper = ({ children }: { children?: ReactNode }) => <SectionContainer
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
            {/*<Popover placement="bottom-end">*/}
            {/*    <PopoverTrigger>*/}
            {/*        <Button size="sm" variant="flat" color="primary" className="hidden xl:flex"*/}
            {/*                startContent={<IconFilter/>}>*/}
            {/*            Filter*/}
            {/*        </Button>*/}
            {/*    </PopoverTrigger>*/}
            {/*    <PopoverContent className="flex flex-col items-stretch gap-2">*/}
            {/*        <DocsVisibilityFilter filter={filter} setFilter={setFilter}/>*/}
            {/*        <Tabs*/}
            {/*            selectedKey={viewMode}*/}
            {/*            onSelectionChange={setViewMode as any}*/}
            {/*            className="w-full"*/}
            {/*            size="sm"*/}
            {/*        >*/}
            {/*            <Tab key="grid" title="Grid"/>*/}
            {/*            <Tab key="list" title="List"/>*/}
            {/*        </Tabs>*/}
            {/*    </PopoverContent>*/}
            {/*</Popover>*/}
            {/*<nav className="xl:hidden"><DocsVisibilityFilter filter={filter} setFilter={setFilter}/></nav>*/}
        </nav>}
    >{children}</SectionContainer>

    if (!data) return <Wrapper><NoDocuments topicId={topicId}/></Wrapper>;

    // Get all unique root folders (_public / user ids)
    const rootFolders = [...new Set(data.map(doc => doc.Key!.split("/")[1]))];
    const userIds = rootFolders.filter(folder => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(folder));

    const sb = await getSupabase();

    const [{ data: profiles, error: profilesError }, ...rootFoldersResponses] = await Promise.all([
        sb.from("profiles").select("id, username").in("user_id", userIds),
        ...rootFolders.map(folder => sb.storage.from("topic_documents").list(topicId + '/' + folder)),
    ]);

    const { rootFoldersContents, rootFoldersErrors } = rootFoldersResponses.reduce<{
        rootFoldersContents: (FileObject & { isPublic: boolean })[][];
        rootFoldersErrors: StorageError[];
    }>((acc, response) => {
        if (response.error) {
            acc.rootFoldersErrors.push(response.error);
        } else {
            acc.rootFoldersContents.push(response.data.map(object => ({ ...object, isPublic: false })));
        }

        return acc;
    }, { rootFoldersContents: [], rootFoldersErrors: [] });

    // const [filter, setFilter] = useState<"all" | "public" | "private">("all");
    // const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const viewMode = "grid";

    const docs = rootFoldersContents.flat();

    return <Wrapper>
        {rootFoldersErrors.length > 0 && <ul className="text-danger">
            {rootFoldersErrors.map((error, i) => <li key={i}>{error.message}</li>)}
        </ul>}
        {docs!.length === 0
            ? <NoDocuments topicId={topicId}/>
            : <ul className={VIEW_MODES_CLASSNAMES[viewMode]}>
                <AnimatePresence initial={false}>
                    {docs.map(doc => <DocumentCard
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
    </Wrapper>;
}

async function WithUsers() {

}