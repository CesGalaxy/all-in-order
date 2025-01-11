import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ topicId: string }> }) {
    const { topicId } = await params;
    const query = req.nextUrl.searchParams;

    // Handle errors
    const error = query.get("error");
    if (error) return NextResponse.redirect(req.nextUrl.origin + `/topics/${topicId}/notebook${req.nextUrl.search}`);

    return new NextResponse("hello world");
}