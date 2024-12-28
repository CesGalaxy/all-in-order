// Imports
import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import type React from "react";
import { getMaybeMyProfile } from "@/supabase/auth/profile";
import { ViewTransitions } from "next-view-transitions";

// Styles
import 'react-toastify/dist/ReactToastify.min.css';
import "./globals.css";
import { RootProvidersClient } from "@/app/providers.client";

const kanit = Kanit({ weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"] });

export const metadata: Metadata = {
    title: "All In Order",
    description: "hello :)",
    icons: {
        apple: "/apple-touch-icon.png",
    },
    openGraph: {
        type: "website",
        title: "All In Order",
        description: "Generate resumes with AI ✨",
        siteName: "All In Order",
        url: "https://all-in-order.vercel.app",
        locale: "es_ES",
        alternateLocale: ["ca_ES", "en_US"],
    }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    // Preload user data while rendering the layout
    // then() is just for linting purposes
    getMaybeMyProfile().then();

    return <ViewTransitions>
        <html lang="en" suppressHydrationWarning className="scroll-smooth">
        <body className={kanit.className + " bg-background text-foreground w-full h-screen transition-background"}>
        <RootProvidersClient>
            {children}
        </RootProvidersClient>
        </body>
        </html>
    </ViewTransitions>;
}
