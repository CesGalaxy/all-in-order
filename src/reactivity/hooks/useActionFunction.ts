"use client";

import { ActionResponse } from "@/lib/helpers/form";
import useActionResponse from "@/reactivity/hooks/useActionResponse";
import { useActionState, useCallback, useRef } from "react";

export type ActionFunctionState<Response extends ActionResponse<any> | undefined, Args extends any[] | []> = [
    loading: boolean,
    response: Response | undefined,
    action: (...args: Args) => Promise<Response>
];

export default function useActionFunction<Response extends ActionResponse<any> | undefined, Args extends any[] | []>(
    serverAction: (...args: Args) => Promise<Response>,
): ActionFunctionState<Response, Args> {
    const responseRef = useRef<Promise<Response> | undefined>(undefined);

    const [state, dispatch, isPending] = useActionState<Response | undefined, Args>((_, args) => {
        responseRef.current = serverAction(...args);
        return responseRef.current;
    }, undefined);

    const action = useCallback((...args: Args) => {
        dispatch(args);
        if (!responseRef.current) throw new Error("Response is not set");
        return responseRef.current;
    }, [dispatch]);

    useActionResponse(state);

    return [isPending, state, action];
}

export function wrapActionFunctionState<Response extends ActionResponse<any> | undefined, Args extends any[] | []>(
    state: ActionFunctionState<Response, Args>,
    wrapper: (action: (...args: Args) => Promise<Response>) => Promise<Response>,
): ActionFunctionState<Response, []> {
    const [loading, response, action] = state;
    const wrappedAction = async () => wrapper(action);
    return [loading, response, wrappedAction];
}