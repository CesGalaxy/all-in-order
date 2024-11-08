import { FileObject } from "@supabase/storage-js";
import { useTranslations } from "next-intl";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Button, ButtonGroup } from "@nextui-org/button";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import SectionContainer from "@/components/containers/SectionContainer";
import NoDocuments from "@/collections/docs/components/views/NoDocuments";

export interface TopicRecentDocsSectionProps {
    docs: FileObject[];
    topicId: number;
}

export default function TopicRecentDocsSection({ docs, topicId }: TopicRecentDocsSectionProps) {
    const t = useTranslations();

    return <SectionContainer
        title={t("App.documents")}
        expanded
        className="flex-grow"
    >
        {docs.length === 0
            ? <NoDocuments topicId={topicId}/>
            : <ul className="grid grid-cols-2 gap-4">
                {docs.map(doc => <Card key={doc.id} as="li">
                    <CardHeader className="items-end gap-2" as={Link}
                                href={`/topics/${topicId}/docs/${btoa(doc.name)}`}>
                        <h3 className="text-xl text-foreground">{doc.name.replace(/\.[a-z0-9]+$/i, "")}</h3>
                        <small
                            className="text-focus">{doc.name.match(/\.[a-z0-9]+$/i)?.[0].slice(1).toUpperCase()}</small>
                    </CardHeader>
                    <CardFooter>
                        <ButtonGroup className="w-full">
                            <Button color="primary" className="w-full" as={Link}
                                    href={`/topics/${topicId}/docs/${btoa(doc.name)}`}
                                    startContent={<IconEdit/>}>
                                {t("Global.edit")}
                            </Button>
                            <Button color="danger" isIconOnly>
                                <IconTrash/>
                            </Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>)}
            </ul>
        }
    </SectionContainer>;
}