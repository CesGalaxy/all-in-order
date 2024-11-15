import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { mountActionError, mountActionSuccess } from "@/lib/helpers/form";

export function handleDirectResponse<T>(response: PostgrestSingleResponse<T>) {
    if (response.error) {
        return mountActionError({ db: [response.error.message] });
    } else {
        return mountActionSuccess(response.data);
    }
}