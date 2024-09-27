import noDataImage from "@/assets/pictures/no_data.svg";
import Blank from "@/components/views/Blank";
import JoinButton from "@/collections/course/JoinButton";
import CreateSubjectButton from "@/collections/subject/CreateSubjectButton";

export default function NoSubjects({ courseId }: { courseId: number }) {
    return <Blank title={"No subjects found"} content={"Create a subject to get started"} image={noDataImage}
                  alt="">
        <nav className="flex items-center gap-4">
            <CreateSubjectButton courseId={courseId}/>
            <JoinButton/>
        </nav>
    </Blank>;
}