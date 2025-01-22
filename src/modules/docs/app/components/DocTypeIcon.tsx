import DocType from "@/modules/docs/app/DocType";
import { IconFileStar, IconFileUnknown, IconMarkdown } from "@tabler/icons-react";

const DocTypeIcon = {
    [DocType.MD]: IconMarkdown,
    [DocType.SD]: IconFileStar,
    [DocType.OTHER]: IconFileUnknown,
}

export default DocTypeIcon;