import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { mountActionError, mountActionSuccess } from "@/lib/helpers/form";

export function handleSingleResponse<T>(response: PostgrestSingleResponse<T>) {
    if (response.error) {
        return mountActionError({ db: [response.error.message] });
    } else {
        return mountActionSuccess(response.data);
    }
}

export function handleCustomSingleResponse<T, U>(response: PostgrestSingleResponse<T>, handle: (data: T) => U) {
    if (response.error) {
        return mountActionError({ db: [response.error.message] });
    } else {
        return mountActionSuccess(handle(response.data));
    }
}
