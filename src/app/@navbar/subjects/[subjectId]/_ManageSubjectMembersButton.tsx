import { Link } from "@nextui-org/link";
import { Subject } from "@/supabase/models/Subject";

export default function ManageSubjectMembersButton({ subject }: { subject: Subject }) {
    return <Link
        as={"button"}
    >
        Manage members
    </Link>;
}