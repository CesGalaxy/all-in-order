import PageContainer from "@/components/containers/PageContainer";
import { createCourseAction } from "@/collections/course/actions";
import ProfileCard from "@/modules/user/components/molecules/ProfileCard";
import SectionContainer from "@/components/containers/SectionContainer";
import ModalButton from "@/components/utils/ModalButton";
import { IconPlus } from "@tabler/icons-react";
import CreateCourseModal from "@/collections/course/components/modals/CreateCourseModal";
import { Suspense } from "react";
import { GenericCardGridSkeleton } from "@/components/common/GenericCardSkeleton";
import CoursesList from "@/collections/course/components/data/CoursesList";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import BlankView from "@/components/views/BlankView";
import noDataImage from "@/assets/pictures/no_data.svg";
import { useTranslations } from "next-intl";

export default function Page() {
    const t = useTranslations();

    return <PageContainer className="w-full grid xl:grid-cols-3 gap-16">
        <SectionContainer
            title="My Courses"
            className="xl:col-span-2 w-full"
            trailing={
                <ModalButton
                    color="primary"
                    radius="full"
                    size="sm"
                    variant="solid"
                    startContent={<IconPlus/>}
                    modal={<CreateCourseModal action={createCourseAction}/>}
                >
                    {t("Dash.Course.new_create")}
                </ModalButton>
            }
        >
            <Suspense fallback={<GenericCardGridSkeleton/>}>
                <CoursesList/>
            </Suspense>
        </SectionContainer>
        <aside className="flex flex-col items-stretch gap-16 order-first xl:order-none w-full">
            <SectionContainer title="My Profile">
                <Suspense fallback={<p>Loading</p>}>
                    <ProfileCard/>
                </Suspense>
            </SectionContainer>
            <SectionContainer
                title="Notifications"
                trailing={
                    <Button
                        as={Link}
                        href="/app#notifications"
                        color="primary"
                        size="sm"
                        variant="flat"
                        radius="full"
                        showAnchorIcon
                    >
                        {t("Global.view_all")}
                    </Button>
                }
            >
                <BlankView image={noDataImage} alt="No notifications" title="No notifications"/>
            </SectionContainer>
        </aside>
    </PageContainer>;
}