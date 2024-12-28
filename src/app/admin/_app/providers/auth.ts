import { createSupabaseClient } from "@/supabase/client";
import { AuthProvider } from "@refinedev/core";
import { getMaybeUser } from "@/supabase/auth/user";

const authProvider: AuthProvider = {
    login: async ({ email, password, providerName: provider }) => {
        // sign in with oauth
        try {
            if (provider) {
                const { data, error } = await createSupabaseClient().auth.signInWithOAuth({ provider, });
                if (error) return { success: false, error };
                if (data?.url) return { success: true };
            }

            // sign in with email and password
            const { data, error } = await createSupabaseClient().auth.signInWithPassword({ email, password });
            if (error) return { success: false, error, };
            if (data?.user) return { success: true };
        } catch (error: any) {
            return { success: false, error };
        }

        return { success: false, error: { message: "Login failed", name: "Invalid email or password" } };
    },
    register: async ({ email, password }) => {
        try {
            const { data, error } = await createSupabaseClient().auth.signUp({ email, password });
            if (error) return { success: false, error };
            if (data) return { success: true };
        } catch (error: any) {
            return { success: false, error };
        }

        return { success: false, error: { message: "Register failed", name: "Invalid email or password" } };
    },
    forgotPassword: async ({ email }) => {
        try {
            const { data, error } = await createSupabaseClient().auth.resetPasswordForEmail(
                email,
                { redirectTo: `${window.location.origin}/admin/update-password`, },
            );

            if (error) return { success: false, error };

            if (data) {
                // notification.open({ type: "success", message: "Success", description:
                // "Please check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder." });
                return { success: true };
            }
        } catch (error: any) {
            return { success: false, error };
        }

        return { success: false, error: { message: "Forgot password failed", name: "Invalid email" } };
    },
    updatePassword: async ({ password }) => {
        try {
            const { data, error } = await createSupabaseClient().auth.updateUser({ password, });
            if (error) return { success: false, error };
            if (data) return { success: true, redirectTo: "/" };
        } catch (error: any) {
            return { success: false, error };
        }
        return { success: false, error: { message: "Update password failed", name: "Invalid password" } };
    },
    logout: async () => {
        const { error } = await createSupabaseClient().auth.signOut();
        if (error) return { success: false, error };
        return { success: true, redirectTo: "/login", };
    },
    onError: async (error) => {
        if (error?.code === "PGRST301" || error?.code === 401) return { logout: true };
        return { error };
    },
    check: async () => {
        try {
            const { data } = await createSupabaseClient().auth.getSession();
            const { session } = data;

            if (!session) return {
                authenticated: false,
                error: {
                    message: "Check failed",
                    name: "Session not found",
                },
                logout: true,
                redirectTo: "/login",
            };
        } catch (error: any) {
            return {
                authenticated: false,
                error: error || {
                    message: "Check failed",
                    name: "Session not found",
                },
                logout: true,
                redirectTo: "/login",
            };
        }

        return { authenticated: true };
    },
    getPermissions: async () => {
        const user = await createSupabaseClient().auth.getUser();
        if (user) return user.data.user?.role;
        return null;
    },
    getIdentity: async () => {
        const user = await getMaybeUser();
        if (user) return { ...user, name: user.email };
        return null;
    },
};

export default authProvider;