"use server";

import TodoInfo from "@/components/dev/TodoInfo";

export default async function Page({ params }: { params: Promise<{ topicId: string }> }) {
    const { topicId } = await params;

    return <TodoInfo>Coming soon&trade;</TodoInfo>
}