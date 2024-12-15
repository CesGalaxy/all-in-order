import { useCallback, useState } from "react";
import { ActionResponse } from "@/lib/helpers/form";
import handleActionResultNotifications from "@/reactivity/functions/handleActionResultNotifications";

export type ActionFunctionState<Response extends ActionResponse<any> | undefined, Args extends any[] | []> = [
    loading: boolean,
    response: Response | undefined,
    action: (...args: Args) => Promise<Response>
];

export default function useActionFunction<Response extends ActionResponse<any> | undefined, Args extends any[] | []>(
    serverAction: (...args: Args) => Promise<Response>,
): ActionFunctionState<Response, Args> {
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

export function wrapActionFunctionState<Response extends ActionResponse<any> | undefined, Args extends any[] | []>(
    state: ActionFunctionState<Response, Args>,
    wrapper: (action: (...args: Args) => Promise<Response>) => Promise<Response>,
): ActionFunctionState<Response, []> {
    const [loading, response, action] = state;
    const wrappedAction = async () => wrapper(action);
    return [loading, response, wrappedAction];
}