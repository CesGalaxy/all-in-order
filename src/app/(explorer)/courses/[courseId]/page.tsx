"use server";

import getSupabase from "@/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import PageContainer from "@/components/containers/PageContainer";
import SectionContainer from "@/components/containers/SectionContainer";
import required from "@/lib/helpers/required";
import ModalButton from "@/components/utils/ModalButton";
import { IconCrown, IconDots, IconEdit, IconTransfer, IconTrash, IconUser, IconUsersPlus } from "@tabler/icons-react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import Image from "next/image";
import { Chip } from "@nextui-org/chip";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import NoSubjects from "@/collections/subject/components/views/NoSubjects";
import DeleteCourseModal from "@/collections/course/components/modals/DeleteCourseModal";
import EditCourseModal from "@/collections/course/components/modals/EditCourseModal";
import { Link } from "@nextui-org/link";
import getHexColor from "@/lib/utils/color";
import CourseCardTopics from "@/collections/course/components/navigation/CourseCardTopics";

export default async function Page(props: { params: Promise<{ courseId: string }> }) {
    const { courseId } = await props.params;

    const supabaseClient = await getSupabase();
    const { data, error } = await supabaseClient
        .from("courses")
        .select("id, name, description, is_public, updated_at, created_at, subjects(id, name, color, topics(id, title)), members:course_members(profile:profiles(id, name, username), is_admin, created_at)")
        .eq("id", courseId)
        .maybeSingle();

    if (error) return <ErrorView message={error.message}/>;

    const { id, name, description, is_public, updated_at, created_at, subjects, members } = required(data);

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
            <ul>
                {members.map(member =>
                    <Card as="li" key={member.profile!.id}>
                        <CardHeader className="flex gap-3">
                            <Image
                                alt="nextui logo"
                                height={40}
                                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                                width={40}
                            />
                            <div className="flex flex-col flex-grow">
                                <p className="text-md">{member.profile!.name}</p>
                                <p className="text-small text-default-500">@{member.profile!.username}</p>
                            </div>
                            <Button isIconOnly variant="light">
                                <IconDots/>
                            </Button>
                        </CardHeader>
                        <CardFooter className="flex justify-between items-center gap-4">
                            <Chip
                                size="sm"
                                className="uppercase gap-1"
                                color={member.is_admin ? "primary" : "secondary"}
                                startContent={member.is_admin ? <IconCrown/> : <IconUser/>}
                                radius="sm"
                            >
                                {member.is_admin ? "Admin" : "Member"}
                            </Chip>
                            <span className="text-default-500">
                                Joined on&nbsp;
                                <time dateTime={member.created_at}>{new Date(member.created_at).toDateString()}</time>
                            </span>
                        </CardFooter>
                    </Card>
                )}
            </ul>
        </SectionContainer>
    </PageContainer>;
}