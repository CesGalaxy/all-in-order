"use client";

import { Select, SelectItem } from "@nextui-org/select";
import { TopicTest } from "@/supabase/models/TopicTest";

export default function TestSelector({ tests, testId }: { tests: TopicTest[], testId: string }) {
    return <Select selectedKeys={[testId]} className="w-full" aria-label="Select test">
        {tests.map(test => <SelectItem key={test.id.toString()}>{test.name}</SelectItem>)}
    </Select>;
}