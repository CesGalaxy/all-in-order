import noDataImage from "@/assets/pictures/no_data.svg";
import BlankView from "@/components/BlankView";
import JoinCourseButton from "@/components/JoinCourseButton";
import CreateSubjectButton from "@/components/CreateSubjectButton";

export default function NoSubjects({ courseId }: { courseId: number }) {
    return <BlankView title={"No subjects found"} content={"Create a subject to get started"} image={noDataImage}
                      alt="">
        <nav className="flex items-center gap-4">
            <CreateSubjectButton courseId={courseId}/>
            <JoinCourseButton/>
        </nav>
    </BlankView>;
}