import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";

export default function NotebookIndex() {
    return <div className="gap-4 min-w-96">
        <h1 className="text-3xl font-semibold col-span-2 text-center">Notebook</h1>
        <Divider/>
        <br/>
        <ul className="list-inside list-decimal">
            <li>
                <Link href={"#"}>
                    First page
                </Link>
            </li>
        </ul>
    </div>;
}