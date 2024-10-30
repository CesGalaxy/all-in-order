import { FileObject } from "@supabase/storage-js";
import { useTranslations } from "next-intl";
import CreateDocButton from "@/collections/docs/CreateDocButton";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Button, ButtonGroup } from "@nextui-org/button";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import SectionContainer from "@/components/containers/SectionContainer";

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
        {!docs || docs.length === 0
            ? <div className="w-full h-full flex-grow flex flex-col items-center justify-center gap-4">
                <h3 className="text-2xl">{t('Dash.Topic.no_documents')}</h3>
                <p>{t("Dash.Topic.no_documents_yet")}</p>
                <CreateDocButton topicId={topicId}/>
            </div>
            : <ul className="grid grid-cols-3 gap-4">
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