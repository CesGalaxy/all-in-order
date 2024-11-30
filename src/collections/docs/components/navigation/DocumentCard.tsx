import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Button, ButtonGroup } from "@nextui-org/button";
import { IconDots, IconEdit, IconPencil } from "@tabler/icons-react";
import { FileObject } from "@supabase/storage-js";
import { useTranslations } from "next-intl";
import { ComponentProps } from "react";

export interface DocumentCardProps {
    doc: FileObject & { isPublic: boolean };
    topicId: number | string;
}

export default function DocumentCard({
                                         doc,
                                         topicId,
                                         as = "section",
                                         ...props
                                     }: DocumentCardProps & ComponentProps<typeof Card>) {
    const t = useTranslations();

    return <Card as={as} {...props}>
        <CardHeader className="justify-between flex-wrap gap-2" as={Link}
                    href={`/topics/${topicId}/docs/${doc.isPublic ? "p" : "m"}-${btoa(doc.name)}`}>
            <header className="flex items-end gap-2">
                <h3 className="text-xl text-foreground">
                    {doc.name.replace(/\.[a-z0-9]+$/i, "")}
                </h3>
                <small className="text-focus">
                    {doc.name.match(/\.[a-z0-9]+$/i)?.[0].slice(1).toUpperCase()}
                </small>
            </header>
            <time className="text-default flex items-center gap-1" dateTime={doc.updated_at}>
                <IconPencil/>
                {new Date(doc.updated_at).toDateString()}
            </time>
        </CardHeader>
        <CardFooter as={ButtonGroup} className="w-full">
            <Button color="primary" className="w-full" as={Link}
                    href={`/topics/${topicId}/docs/${btoa(doc.name)}`}
                    startContent={<IconEdit/>}>
                {t("Global.edit")}
            </Button>
            <Button isIconOnly>
                <IconDots/>
            </Button>
        </CardFooter>
    </Card>;
}