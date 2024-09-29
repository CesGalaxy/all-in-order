// Imports
import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import type React from "react";
import { getMaybeMyProfile } from "@/supabase/models/Profile";
import { ViewTransitions } from "next-view-transitions";
import Providers from "@/app/providers";

// Styles
import 'react-toastify/dist/ReactToastify.min.css';
import "./globals.css";

const kanit = Kanit({ weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"] });

export const metadata: Metadata = {
    title: "All In Order",
    description: "hello :)",
    icons: {
        apple: "/apple-touch-icon.png",
    }
};

export default function RootLayout({
                                       children, navbar
                                   }: Readonly<{
    children: React.ReactNode;
    navbar: React.ReactNode;
}>) {
    // Preload user data while rendering the layout
    getMaybeMyProfile();

    return <ViewTransitions>
        <html lang="en">
        <body className={kanit.className + " bg-background text-foreground w-full h-screen"}>
        <Providers>
            <div className="w-full h-full flex flex-col items-stretch justify-stretch">
                {navbar}
                <main className="flex-grow w-full h-full min-h-0">
                    {children}
                </main>
            </div>
        </Providers>
        </body>
        </html>
    </ViewTransitions>;
}
