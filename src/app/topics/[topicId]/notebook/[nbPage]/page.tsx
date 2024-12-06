"use server";

export default async function Page({ params }: { params: Promise<{ topicId: string, nbPage: string }> }) {
    const { topicId, nbPage } = await params;
    return <p className="p-4 text-lg">Reading page <b>{nbPage}</b> from the notebook of the topic with ID={topicId}.</p>
}