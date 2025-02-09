"use server";

import ErrorView from "@/components/views/ErrorView";
import MonthCalendar from "@/features/calendar/components/MonthCalendar";
import getSupabase from "@/lib/supabase/server";

export default async function SubjectCalendarSection({ id }: { id: number }) {
    const sb = await getSupabase();
    const { data, error } = await sb
        .from("subject_events")
        .select("*")
        .eq("subject_id", id)
        .order("starts_at", { ascending: true });

    if (error) return <ErrorView message={error.message}/>;

    // Group with YYYY-MM
    const grouped = data.reduce((acc, event) => {
        const key = event.starts_at.slice(0, 7);
        if (!acc[key]) acc[key] = [];
        acc[key].push(event);
        return acc;
    }, {} as Record<string, any[]>);

    console.log(grouped)

    return <MonthCalendar subjectId={id}/>;
}