import { NextRequest } from "next/server";
import { sbServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest, {params}: {params: Promise<{pageId: string}>}) {
    const {pageId} = await params;

    const sb = await sbServerClient();

    // Fetch the page data from the database
    const {data: page, error} = await sb
        .from("notebook_pages")
        .select("notebook_id")
        .eq("id", pageId)
        .maybeSingle();

    // Handle errors and missing page
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    if (!page) return new Response(JSON.stringify({ error: "Page not found" }), { status: 404 });

    // Redirect to the notebook page
    redirect(`/notebooks/${page.notebook_id}/p/${pageId}`);
}