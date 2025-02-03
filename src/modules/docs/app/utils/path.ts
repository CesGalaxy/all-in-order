export function getTopicDocPath(topicId: number, name: string, owner?: string | null) {
    return topicId + '/' + (owner || '_public') + '/' + name
}