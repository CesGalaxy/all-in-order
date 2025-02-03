"use server";

import ErrorView from "@/components/views/ErrorView";
import PageContainer from "@/components/containers/PageContainer";
import SectionContainer from "@/components/containers/SectionContainer";
import ModalButton from "@/components/utils/ModalButton";
import { IconEdit, IconTransfer, IconTrash, IconUsersPlus } from "@tabler/icons-react";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Button, ButtonGroup } from "@heroui/button";
import { Divider } from "@heroui/divider";
import NoSubjects from "@/collections/subject/components/views/NoSubjects";
import DeleteCourseModal from "@/collections/course/components/modals/DeleteCourseModal";
import EditCourseModal from "@/collections/course/components/modals/EditCourseModal";
import { Link } from "@heroui/link";
import getHexColor from "@/lib/utils/color";
import CourseCardTopics from "@/collections/course/components/navigation/CourseCardTopics";
import CoursePageMembersList from "@/domains/course/CoursePageMembersList";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getCourse } from "@/collections/course/query";

export default async function Page(props: { params: Promise<{ courseId: string }> }) {
    const { courseId } = await props.params;

    const { data, error } = await getCourse(parseInt(courseId));

    if (error) return <ErrorView message={error.message}/>;
    if (!data) return notFound();
    const { id, name, description, is_public, updated_at, created_at, subjects } = data;

    return <PageContainer className="grid gap-16 lg:grid-cols-2">
        <SectionContainer
            title="Course details"
            trailing={
                <ModalButton
                    color="primary"
                    radius="full"
                    size="sm"
                    startContent={<IconEdit/>}
                    modal={<EditCourseModal action={id} courseName={name} courseDescription={description}
                                            courseVisibility={is_public}/>}
                >
                    Edit
                </ModalButton>
            }
        >
            <Card className="lg:sticky lg:top-24">
                <CardHeader>
                    <h2 className="font-bold text-3xl">{name}</h2>
                    {description && <small className="text-default-500">{description}</small>}
                </CardHeader>
                <CardBody as="ul">
                    <li>
                        <b>Visibility:&nbsp;</b>
                        <span className="capitalize">{is_public ? "Public" : "Private"}</span>
                    </li>
                    {updated_at && <li>
                        <b>Updated at:&nbsp;</b>
                        <time dateTime={new Date(updated_at).toISOString()}>{new Date(updated_at).toDateString()}</time>
                    </li>}
                    <li>
                        <b>Created at:&nbsp;</b>
                        <time dateTime={new Date(created_at).toISOString()}>{new Date(id).toDateString()}</time>
                    </li>
                    <Divider className="my-4"/>
                    {subjects && subjects.length > 0
                        ? <ul className="w-full flex flex-col items-stretch gap-4">
                            {
                                subjects.map(subject => <ButtonGroup
                                    key={subject.id}
                                    className="w-full"
                                    as="li"
                                    size="lg"
                                >
                                    <Button
                                        as={Link}
                                        href={"/subjects/" + subject.id}
                                        style={{
                                            backgroundColor: subject.color
                                                ? `${getHexColor(subject.color)}`
                                                : "transparent",
                                            color: subject.color ? "#fff" : "#000"
                                        }}
                                        className="w-full"
                                    >
                                        {subject.name}
                                    </Button>
                                    <CourseCardTopics topics={subject.topics}/>
                                </ButtonGroup>)
                            }
                        </ul>
                        : <NoSubjects courseId={id}/>}
                </CardBody>
                <CardFooter className="flex gap-4 justify-end w-full">
                    <Button color="warning" variant="light" startContent={<IconTransfer/>}>
                        Transfer ownership
                    </Button>
                    <ModalButton modal={<DeleteCourseModal action={id}/>} color="danger" startContent={<IconTrash/>}>
                        Delete
                    </ModalButton>
                </CardFooter>
            </Card>
        </SectionContainer>
        <SectionContainer title="Members" trailing={
            <ModalButton
                color="primary"
                radius="full"
                size="sm"
                startContent={<IconUsersPlus/>}
                modal={<p>Hello</p>}
            >
                Invite members
            </ModalButton>
        }>
            <Suspense fallback={<CoursePageMembersList.Skeleton/>}>
                <CoursePageMembersList courseId={parseInt(courseId)}/>
            </Suspense>
        </SectionContainer>
    </PageContainer>;
}