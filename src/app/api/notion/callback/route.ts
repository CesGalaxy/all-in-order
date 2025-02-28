import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams;

    // Handle errors
    const error = query.get("error");
    // if (error) return NextResponse.redirect(req.nextUrl.origin + `/topics/${topicId}/notebook${req.nextUrl.search}`);
    if (error) return new NextResponse("Error: " + error, { status: 400 });

    const code = query.get("code");
    if (!code) return new NextResponse("Missing code", { status: 400 });
    console.log(code);

    let redirect_uri = req.nextUrl.origin + req.nextUrl.pathname;
    // Remove ending /
    if (redirect_uri.endsWith("/")) redirect_uri = redirect_uri.slice(0, -1);

    // Fetch to the notion api
    try {
        const unencodedAuth = process.env.NOTION_CLIENT_ID + ":" + process.env.NOTION_CLIENT_SECRET;
        const response = await fetch("https://api.notion.com/v1/oauth/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + Buffer.from(unencodedAuth).toString("base64"),
            },
            body: JSON.stringify({
                grant_type: "authorization_code",
                code,
                redirect_uri,
            }),
        });

        const data = await response.json();
        if ("error" in data) return NextResponse.json(data, { status: 400 });

        console.log(data);

        const cookieStore = await cookies();
        cookieStore.set("notion_token", data.access_token);

        return NextResponse.redirect(query.get("state") || "/");
    } catch (e) {
        return new NextResponse("Error: " + e, { status: 500 });
    }
}