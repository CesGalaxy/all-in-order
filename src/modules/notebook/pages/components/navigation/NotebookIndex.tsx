import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { FileObject } from "@supabase/storage-js";
import { Button } from "@heroui/button";
import { IconBrandNotion } from "@tabler/icons-react";

export default function NotebookIndex({ files }: { files: FileObject[] }) {
    return <div className="min-w-96 space-y-8">
        <section>
            <header>
                <h1 className="text-3xl font-semibold col-span-2 text-center">Notebook</h1>
                <Divider/>
                <br/>
            </header>
            <ul className="list-inside list-decimal text-lg">
                {files.map(file => <li key={file.id}>
                    <Link href={file.name.replace(".json", "")} className="text-lg" underline="hover">
                        {atob(file.name.replace(".json", ""))}
                    </Link>
                </li>)}
            </ul>
        </section>
        <nav className="w-full flex">
            <Button as={Link} href="notion" startContent={<IconBrandNotion/>} variant="ghost">
                Sync with Notion
            </Button>
        </nav>
    </div>;
}