import { cache } from "react";
import getSupabase from "@/supabase/server";
import { getMaybeUser } from "@/supabase/auth/user";
import { FileObject } from "@supabase/storage-js";

export interface TopicDocumentObject extends FileObject {
    isPublic: boolean;
}

const getTopicDocuments = cache(async (topicId: number | string) => {
    const publicReq = getSupabase().storage
        .from("topic_documents")
        .list(topicId.toString());

    const userReq = getMaybeUser();

    const { data: publicData, error: publicError } = await publicReq;
    const r = {
        publicError,
        privateError: null,
        publicData: publicData
            ?.filter(file => file.id)
            .map<TopicDocumentObject>(file => ({ ...file, isPublic: file.name.includes("/_public/") })),
        privateData: null
    };

    // Idea for deltaX: collection.filter("id" in this)
    // collection.map(this.any_property)

    const user = await userReq;
    if (user) {
        const { data, error: privateError } = await getSupabase().storage
            .from("topic_documents")
            .list(topicId + "/" + user.id);

        return {
            ...r,
            privateError,
            privateData: data
                ?.map<TopicDocumentObject>(file => ({ ...file, isPublic: file.name.includes("/_public/") }))
        };
    }

    return r;
});

export default getTopicDocuments;