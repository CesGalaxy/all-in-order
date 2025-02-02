import { Converter } from "showdown";

export default function ViewMdDoc({ content }: { content: string }) {
    const converter = new Converter({
        // I'm doing this because of the typo warning
        ["task" + "lists"]: true,
        simplifiedAutoLink: true,
        strikethrough: true,
    });

    const html = converter.makeHtml(content);

    return <div className="revert-tailwind-only-child flwx-grow overflow-auto px-8 vt-name-[md-doc-content]"
                dangerouslySetInnerHTML={{ __html: html }}/>;
}