import { JSONContent } from "novel";

export default interface NotebookPageData {
    appearance: {
        font: {
            family: string,
        },
    },
    content: JSONContent,
};

export const BlankNotebookPage: NotebookPageData = {
    appearance: {
        font: {
            family: "sans",
        },
    },
    content: {},
};
