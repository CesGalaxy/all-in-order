"use client";

import { ActionResponse, ActionState } from "@/lib/helpers/form";
import { useEffect } from "react";
import handleActionResultNotifications from "@/reactivity/functions/handleActionResultNotifications";

export default function useActionResponse(response?: ActionResponse<any, any> | ActionState<any> | null) {
    useEffect(() => handleActionResultNotifications(response), [response]);
}