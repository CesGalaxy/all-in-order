import noDataImage from "@/assets/pictures/no_data.svg";
import BlankView from "@/components/views/BlankView";
import ModalButton from "@/components/utils/ModalButton";
import CreateSubjectModal from "@/collections/subject/components/modals/CreateSubjectModal";
import { IconPlus } from "@tabler/icons-react";

export default function NoSubjects({ courseId }: { courseId: number }) {
    return <BlankView title={"No subjects found"} content={"Create a subject to get started"} image={noDataImage}
                      alt="No subjects found">
        <nav className="flex items-center gap-4">
            <ModalButton modal={<CreateSubjectModal action={courseId}/>} color="primary" startContent={<IconPlus/>}>
                Create a subject
            </ModalButton>
        </nav>
    </BlankView>;
}