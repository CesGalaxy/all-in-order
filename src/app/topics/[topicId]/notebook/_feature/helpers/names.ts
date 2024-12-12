export function getNotebookRootPath(topicId: string | number, userId: string, fileName: string = "") {
    return topicId + "/" + userId + "/" + fileName;
}