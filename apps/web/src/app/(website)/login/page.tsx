import LoginForm from "@/modules/user/auth/components/login-form";

export default function Page() {
    return <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <LoginForm/>
    </div>;
}