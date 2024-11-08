import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Button, ButtonGroup } from "@nextui-org/button";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { FileObject } from "@supabase/storage-js";
import { useTranslations } from "next-intl";
import { ComponentProps } from "react";

export interface DocumentCardProps {
    doc: FileObject;
    topicId: number;
}

export default function DocumentCard({ doc, topicId, ...props }: DocumentCardProps & ComponentProps<typeof Card>) {
    const t = useTranslations();

    return <Card as="li" {...props}>
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
    </Card>
}