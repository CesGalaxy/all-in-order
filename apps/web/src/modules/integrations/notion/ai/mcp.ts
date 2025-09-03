import { experimental_createMCPClient as createMCPClient } from 'ai';

export const createNotionMcpClient = (token: string) => createMCPClient({
    transport: {
        type: 'sse',
        url: 'https://mcp.notion.com/sse',

        // optional: configure HTTP headers, e.g. for authentication
        headers: {
            "Authorization": 'Bearer ' + token,
            "Notion-Version": "2022-06-28"
        },
    },
});