import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";
import { FileObject } from "@supabase/storage-js";

export default function NotebookIndex({ files }: { files: FileObject[] }) {
    return <div className="gap-4 min-w-96">
        <h1 className="text-3xl font-semibold col-span-2 text-center">Notebook</h1>
        <Divider/>
        <br/>
        <ul className="list-inside list-decimal text-lg">
            {files.map(file => <li key={file.id}>
                <Link href={file.name.replace(".json", "")} className="text-lg" underline="hover">
                    {atob(file.name.replace(".json", ""))}
                </Link>
            </li>)}
        </ul>
    </div>;
}