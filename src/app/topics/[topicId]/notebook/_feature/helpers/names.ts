export function getNotebookRootPath(topicId: string | number, userId: string, fileName: string = "") {
    return userId + "/" + topicId + "/" + fileName;
}