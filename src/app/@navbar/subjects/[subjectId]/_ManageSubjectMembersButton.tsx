import { Link } from "@nextui-org/link";

export default function ManageSubjectMembersButton(_: { subject: any }) {
    return <Link
        as={"button"}
    >
        Manage members
    </Link>;
}