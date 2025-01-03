"use server";

export default async function Page({ params, searchParams }: {
    params: Promise<{ topicId: string }>,
    searchParams: Promise<Record<string, string | string[]>>,
}) {
    const { topicId } = await params;
    const { mode, area } = await searchParams;
    return <div>
        
    </div>;
}