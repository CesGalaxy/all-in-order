import { getSubjectWithContent } from "@/app/(app)/(explorer)/subjects/[subjectId]/query";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";
import SubjectSidebarDropdown from "@/app/(app)/(explorer)/@sidebar/subjects/[subjectId]/SubjectSidebarDropdown";
import { getTranslations } from "next-intl/server";
import ModalButton from "@/components/utils/ModalButton";
import CreateTopicModal from "@/collections/topic/components/modals/CreateTopicModal";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ subjectId: string }> }) {
    const { subjectId } = await params;

    const t = await getTranslations();

    const { data, error } = await getSubjectWithContent(parseInt(subjectId));
    if (error) return;
    if (!data) return notFound();
    const { id, name, description, topics } = data;

    return <aside className="min-w-64 w-full md:w-64 px-2 py-2 md:sticky md:top-16 h-fit">
        <Card>
            <CardHeader>
                <h1 className="text-xl font-medium">{name}</h1>
                {description && <p className="text-default-500 text-sm">{description}</p>}
            </CardHeader>
            <Divider/>
            <CardBody as="ul" className="flex md:flex-col flex-wrap">
                {topics.map((topic: any) => <li key={topic.id}>
                    <Link href={"/topics/" + topic.id}>{topic.title}</Link>
                </li>)}
            </CardBody>
            <Divider/>
            <CardFooter>
                <ModalButton
                    className="flex-grow !rounded-r-none"
                    variant="faded"
                    modal={<CreateTopicModal action={id}/>}
                >{t("Dash.Topic.new")}</ModalButton>
                <SubjectSidebarDropdown subjectId={id}/>
            </CardFooter>
        </Card>
    </aside>
}