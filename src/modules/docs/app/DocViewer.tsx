import ViewSmartDoc from "@/modules/docs/smartdoc/app/ViewSmartDoc";
import DocType from "@/modules/docs/app/DocType";

export default function DocViewer({ type, content }: { type: DocType, content: string, name: string }) {
    switch (type) {
        case DocType.SD:
            return <ViewSmartDoc content={content}/>;
        default:
            return <p className="bg-red-500 p-16">Unknown document type!</p>;
    }
}