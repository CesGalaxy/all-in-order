import { SupabaseClient } from "@supabase/supabase-js";
import { Database, TablesUpdate } from "@aio/db/supabase";

export interface UpdateOptions {
    noUpdateTime?: boolean;
}

type NoTimestamps = { updated_at: never, created_at: never };

/**
 * Update a row in the database
 * @param supabaseClient The client to use for querying the update
 * @param table The name of the table to update
 * @param newData The new data to update the row with
 * @param options Options for the update
 * @returns A request to update the row
 */
export default function makeUpdate<T extends keyof Database["public"]["Tables"], O extends UpdateOptions | undefined>(
    supabaseClient: SupabaseClient<Database>,
    table: T,
    newData: TablesUpdate<T> & (O extends UpdateOptions ? (O["noUpdateTime"] extends true ? {} : NoTimestamps) : {}),
    options?: O
) {
    delete newData.created_at;

    // Update the updated_at field if it exists and instructed in the options
    if (!options?.noUpdateTime && 'updated_at' in newData) newData.updated_at = new Date(Date.now()).toISOString();

    // FIXME: This is a hack to make TypeScript happy
    return supabaseClient.from(table).update(newData as any);
}