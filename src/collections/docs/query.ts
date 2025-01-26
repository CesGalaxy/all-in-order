import { cache } from "react";
import { createS3Client } from "@/lib/s3/server";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";

export const getAllTopicDocs = cache(async (topicId: number) => {
    const { s3, error } = await createS3Client();

    if (!s3) return { data: null, error };

    const command = new ListObjectsV2Command({
        Bucket: 'topic_documents',
        Prefix: `${topicId}/`,
    });

    const output = await s3.send(command);

    const { Contents } = output;

    return { data: Contents, error: null };
});