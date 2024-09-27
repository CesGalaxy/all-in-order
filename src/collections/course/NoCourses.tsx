import noDataImage from "@/assets/pictures/no_data.svg";
import Blank from "@/components/views/Blank";
import CreateButton from "@/collections/course/CreateButton";
import JoinButton from "@/collections/course/JoinButton";

export default function NoCourses() {
    return <Blank title={"No courses found"} content={"Create a course to get started"} image={noDataImage} alt="">
        <nav className="flex items-center gap-4">
            <CreateButton/>
            <JoinButton/>
        </nav>
    </Blank>;
}