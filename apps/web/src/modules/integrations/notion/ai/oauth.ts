/**
 * It took me +6h to figure out how to do this.
 * (C) ChatGPT-5 (yes, first time using it)
 *
 * After all the suffering, researching and learning specs and references,
 * I plan to make a lib out of this, for the good of humanity.
 *
 * ~ César 4 Sept. 2025
 */
// TODO: Change this. Instead, get it from the manifest
const AUTHORIZATION_ENDPOINT = "https://mcp.notion.com/authorize";
const TOKEN_ENDPOINT = "https://mcp.notion.com/token";
// const REGISTRATION_ENPOINT = "https://mcp.notion.com/register";
const SCOPE = "read write";
const REDIRECT_URI = "http://localhost:3000/auth/callback/notion-mcp";

export function mountNotionMCPAuthorizationUrl(redirectUri: string) {
    console.log("MOUNT:", process.env.NEXT_PUBLIC_NOTION_MCP_CLIENT_ID)
    const url = new URL(AUTHORIZATION_ENDPOINT);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("client_id", process.env.NEXT_PUBLIC_NOTION_MCP_CLIENT_ID! as string);
    url.searchParams.set("redirect_uri", REDIRECT_URI);
    url.searchParams.set("scope", SCOPE);
    url.searchParams.set("state", encodeURIComponent(redirectUri));
    return url.toString();
}

export async function exchangeNotionMCPCodeForToken(code: string) {
    const tokenRes = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: REDIRECT_URI,
            client_id: process.env.NEXT_PUBLIC_NOTION_MCP_CLIENT_ID! as string,
            client_secret: process.env.NOTION_MCP_CLIENT_SECRET! as string,
        }),
    });

    return await tokenRes.json();
}