import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { ActionResponse } from "@/lib/helpers/form";

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

        if (response) {
            if (response.ok) {
                if (response.comments)
                    for (const tag in response.comments)
                        for (const comment of response.comments[tag]!)
                            toast(comment, { type: "success" });
            } else {
                if (response.errors)
                    for (const tag in response.errors)
                        for (const error of response.errors[tag]!)
                            toast(error, { type: "error" });
            }
        }

        return response;
    }, [serverAction, setLoading])

    return [loading, response, action];
}