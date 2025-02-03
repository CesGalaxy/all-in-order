import { NextRequest } from "next/server";
import { getUser } from "@/lib/supabase/auth/user";
import getSupabase from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export type NotebookVocabularyAreaDownloadFormat = "json" | "csv";

export async function GET(req: NextRequest, { params }: {
    params: Promise<{ topicId: string, encodedAreaName: string }>
}) {
    const { topicId, encodedAreaName } = await params;
    const user = await getUser();
    const areaName = decodeURIComponent(encodedAreaName);

    const supabaseClient = await getSupabase();
    const { data, error } = await supabaseClient
        .from("notebooks")
        .select("area:nb_vocab_areas(id, icon, name, description, definitions: nb_vocab_definitions(*))")
        .eq("topic", parseInt(topicId))
        .eq("user", user.id)
        .eq("area.name", areaName)
        .maybeSingle();

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    if (!data || data.area.length !== 1) notFound();
    const [area] = data.area;

    const searchParams = req.nextUrl.searchParams
    const format = searchParams.get('format')

    switch (format) {
        case "csv":
            return new Response(
                area.definitions.map(def => `${def.term},${def.definition}`).join("\n"),
                {
                    headers: {
                        "Content-Type": "text/csv",
                        "Content-Disposition": `attachment; filename="vocabulary-${areaName}.csv"`
                    }
                }
            );
        default:
            return new Response(JSON.stringify(area.definitions), {
                headers: {
                    "Content-Type": "application/json",
                    "Content-Disposition": `attachment; filename="vocabulary-${areaName}.json"`
                }
            });
    }
}