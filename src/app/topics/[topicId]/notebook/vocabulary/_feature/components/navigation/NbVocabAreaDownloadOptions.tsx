"use client";

import { useParams, useRouter } from "next/navigation";
import useNotebook from "@/app/topics/[topicId]/notebook/_feature/reactivity/hooks/useNotebook";
import { PopoverContent } from "@nextui-org/popover";
import { Link } from "@nextui-org/link";

const FORMATS = ["json", "csv"] as const;

export default function NbVocabAreaDownloadOptions() {
    const { topicId } = useNotebook();
    const { encodedAreaName } = useParams<{ encodedAreaName?: string }>();
    const router = useRouter();

    if (!encodedAreaName) throw new Error("No area name provided");

    return <PopoverContent>{titleProps => <div className="px-1 py-2 w-full min-w-64 flex flex-col gap-2">
        <p className="text-small font-bold text-foreground"  {...titleProps}>Download Options</p>
        {FORMATS.map(format =>
            <Link
                key={format}
                href={`/topics/${topicId}/notebook/vocabulary/${encodedAreaName}/download?format=${format}`}
                download
                underline="hover"
            >{format}</Link>
        )}
    </div>}</PopoverContent>
}