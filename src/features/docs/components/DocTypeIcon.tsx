import DocType from "@/features/docs/DocType";
import { IconFileUnknown, IconMarkdown } from "@tabler/icons-react";

const DocTypeIcon = {
    [DocType.MD]: IconMarkdown,
    [DocType.OTHER]: IconFileUnknown,
}

export default DocTypeIcon;