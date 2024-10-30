import { ActionResponse, FormActionState } from "@/lib/helpers/form";
import { toast } from "react-toastify";

export default function handleActionResultNotifications(response?: ActionResponse<any, any> | FormActionState<any> | null) {
    if (response) {
        if ("submitted" in response && !response.submitted) return;

        if (response.ok) {
            if (response.comments)
                for (const comment of response.comments)
                    toast(comment, { type: "success" });
        } else {
            if (response.errors)
                for (const tag in response.errors)
                    for (const error of response.errors[tag]!)
                        toast(error, { type: "error" });
        }
    }
}