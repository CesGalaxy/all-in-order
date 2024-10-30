"use client";

import { ActionResponse, FormActionState } from "@/lib/helpers/form";
import { useEffect } from "react";
import handleActionResultNotifications from "@/reactivity/functions/handleActionResultNotifications";

export default function useActionResponse(response?: ActionResponse<any, any> | FormActionState<any> | null) {
    useEffect(() => handleActionResultNotifications(response), [response]);
}