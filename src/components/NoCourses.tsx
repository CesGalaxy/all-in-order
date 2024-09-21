import noDataImage from "@/assets/pictures/no_data.svg";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import BlankView from "@/components/BlankView";
import CreateCourseButton from "@/components/CreateCourseButton";

export default function NoCourses() {
    return <BlankView title={"No courses found"} content={"Create a course to get started"} image={noDataImage} alt="">
        <nav className="flex items-center gap-4">
            <CreateCourseButton/>
            <Button as={Link} href="/courses/create">Join with code</Button>
        </nav>
    </BlankView>;
}