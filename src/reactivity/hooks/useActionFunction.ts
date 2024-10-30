import { useCallback, useState } from "react";
import { ActionResponse } from "@/lib/helpers/form";
import handleActionResultNotifications from "@/reactivity/functions/handleActionResultNotifications";

export default function useActionFunction<Args extends any[] | [], Response extends ActionResponse<any>>(
    serverAction: (...args: Args) => Promise<Response>
): [loading: boolean, response: Response | undefined, action: (...args: Args) => Promise<Response>] {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<Response>();

    const action = useCallback(async (...args: Args) => {
        setLoading(true);
        const response = await serverAction(...args);
        setResponse(response);
        setLoading(false);

        handleActionResultNotifications(response);

        return response;
    }, [serverAction, setLoading])

    return [loading, response, action];
}