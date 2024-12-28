import { getSubjectPageData } from "@/app/(app)/(explorer)/subjects/[subjectId]/query";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import required from "@/lib/helpers/required";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import SubjectSidebarDropdown from "@/app/(app)/(explorer)/@sidebar/subjects/[subjectId]/SubjectSidebarDropdown";
import { getTranslations } from "next-intl/server";

export default async function Page(props: { params: Promise<{ subjectId: string }> }) {
    const params = await props.params;

    const {
        subjectId
    } = params;

    const t = await getTranslations();

    const { data, error } = await getSubjectPageData(subjectId);

    const { id, name, description, topics } = required(data);

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
                <Button className="flex-grow !rounded-r-none" variant="faded">{t("Dash.Topic.new")}</Button>
                <SubjectSidebarDropdown subjectId={id}/>
            </CardFooter>
        </Card>
    </aside>
}