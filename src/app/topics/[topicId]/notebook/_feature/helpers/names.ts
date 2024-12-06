export function getNotebookRootPath(topicId: string | number, userId: string) {
    return topicId + "/" + userId + "/";
}