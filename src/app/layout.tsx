import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import { Providers } from "@/app/providers";
import type React from "react";
import Navbar from "@/app/navbar";
import { getMaybeMyProfile } from "@/lib/supabase/models/Profile";

import "./globals.css";
import 'react-toastify/dist/ReactToastify.min.css';
import { ViewTransitions } from "next-view-transitions";

const kanit = Kanit({ weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    // Preload user data while rendering the layout
    getMaybeMyProfile();

    return <ViewTransitions>
        <html lang="en">
        <body className={kanit.className + " bg-background text-foreground w-full h-screen"}>
        <Providers>
            <div className="w-full h-full flex flex-col items-stretch justify-stretch">
                <header>
                    <Navbar/>
                </header>
                <main className="flex-grow w-full h-full min-h-0">
                    {children}
                </main>
            </div>
        </Providers>
        </body>
        </html>
    </ViewTransitions>;
}
