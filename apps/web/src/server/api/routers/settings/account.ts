import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { sbServerClient } from "@/lib/supabase/server";
import { TRPCError } from "@trpc/server";
import { getMyProfile } from "@/modules/user/auth/server";

export const accountSettingsRouter = createTRPCRouter({
    getConnectedAccounts: protectedProcedure
        .query(async () => {
            const sb = await sbServerClient();
            const { data, error } = await sb.auth.getUserIdentities();

            if (error) throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'An unexpected error occurred, please try again later.',
                cause: error,
            });

            return data;
        }),
    getProfile: protectedProcedure
        .query(async () => {
            const { user, data, error } = await getMyProfile();

            if (error) throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'An unexpected error occurred, please try again later.',
                cause: error,
            });

            return {user, profile: data};
        }),
});