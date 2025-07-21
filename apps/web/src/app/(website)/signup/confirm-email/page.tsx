import Link from "next/link";
import Image from "next/image";
import LogoNameCol from "@/assets/logo/NameColMargin.svg";

export default function Page() {
    return <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="w-full max-w-sm">
            <div className="flex flex-col items-center gap-2">
                <Link
                    href="/"
                    className="flex flex-col items-center gap-2 font-medium"
                >
                    <Image src={LogoNameCol} alt="All In Order" width={199} priority/>
                    <span className="sr-only">All In Order</span>
                </Link>
                <h1 className="text-xl font-bold">You&#39;re almost done!</h1>
                <div className="text-center text-sm">
                    Confirm your email to complete the signup process. If you haven&#39;t received an email,{" "}
                </div>
            </div>
        </div>
    </div>;
}