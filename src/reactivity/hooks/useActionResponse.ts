"use client";

import { ActionResponse, FormActionState } from "@/lib/helpers/form";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function useActionResponse(response?: ActionResponse<any, any> | FormActionState<any> | null) {
    useEffect(() => {
        if (response) {
            if ("submitted" in response && !response.submitted) return;

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
    }, [response]);
}