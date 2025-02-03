import ViewSmartDoc from "@/modules/docs/smartdoc/app/ViewSmartDoc";
import DocType from "@/modules/docs/app/DocType";
import ViewMdDoc from "@/modules/docs/markdown/components/ViewMdDoc";

export default function DocViewer({ type, content }: { type: DocType, content: string, name: string }) {
    switch (type) {
        case DocType.MD:
            return <ViewMdDoc content={content}/>;
        case DocType.SD:
            return <ViewSmartDoc content={content}/>;
        default:
            return <p className="bg-red-500 p-16">Unknown document type!</p>;
    }
}