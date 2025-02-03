import DocType from "@/modules/docs/app/DocType";
import EditSmartDoc from "@/modules/docs/smartdoc/app/EditSmartDoc";
import ErrorView from "@/components/views/ErrorView";
import { Link } from "@heroui/link";
import { IconDownload } from "@tabler/icons-react";
import EditMdDoc from "@/modules/docs/markdown/components/EditMdDoc";
import EditorToolbar from "@/modules/docs/app/components/navigation/EditorToolbar";
import DocEditorProvider from "@/modules/docs/app/reactivity/providers/DocEditorProvider";

export default function DocEditor({ name, initialContent, saveAction, type, signedUrl }: {
    name: string,
    initialContent: string,
    saveAction: (content: string) => Promise<boolean>,
    type: DocType,
    signedUrl: string,
}) {
    let editor;
    switch (type) {
        case DocType.MD:
            editor = <EditMdDoc/>;
            break;
        case DocType.SD:
            editor = <EditSmartDoc/>;
            break;
        default:
            return <ErrorView message="Unknown file type!">
                <br/>
                <Link href="#"><IconDownload/>&nbsp;&nbsp;Download file</Link>
            </ErrorView>;
    }

    return <DocEditorProvider name={name} initialContent={initialContent} saveAction={saveAction} signedUrl={signedUrl}>
        <div className="w-full h-full flex flex-col lg:flex-row">
            <EditorToolbar/>
            {editor}
        </div>
    </DocEditorProvider>;
}