import DocType from "@/modules/docs/app/DocType";
import EditSmartDoc from "@/modules/docs/smartdoc/app/EditSmartDoc";
import ErrorView from "@/components/views/ErrorView";
import { Link } from "@nextui-org/link";
import { IconDownload } from "@tabler/icons-react";
import EditMdDoc from "@/modules/docs/markdown/components/EditMdDoc";

export default function DocEditor({ type }: { type: DocType }) {
    switch (type) {
        case DocType.MD:
            return <EditMdDoc/>;
        case DocType.SD:
            return <EditSmartDoc/>;
        default:
            return <ErrorView message="Unknown file type!">
                <br/>
                <Link href="#"><IconDownload/>&nbsp;&nbsp;Download file</Link>
            </ErrorView>;
    }
}