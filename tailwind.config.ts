import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/theme";
import viewTransitions from "tailwindcss-view-transitions";
import ContainerQueries from "@tailwindcss/container-queries";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/collections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(accordion|alert|avatar|breadcrumbs|button|card|checkbox|chip|drawer|dropdown|input|link|modal|navbar|popover|radio|scroll-shadow|select|skeleton|spinner|toggle|table|tabs|user|divider|ripple|form|menu|listbox|spacer).js"
  ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    darkMode: "class",
    plugins: [
        nextui({
            themes: {
                light: {
                    colors: {
                        primary: {
                            100: "#D9D7FC",
                            200: "#B4B1F9",
                            300: "#8B86EE",
                            400: "#6965DE",
                            500: "#3C37C8",
                            600: "#2C28AC",
                            700: "#1E1B90",
                            800: "#131174",
                            900: "#0C0A60",
                            DEFAULT: "#3C37C8",
                        },
                    }
                },
                dark: {
                    colors: {
                        primary: {
                            100: "#FDD4D0",
                            200: "#FCA3A5",
                            300: "#F67484",
                            400: "#EE5073",
                            500: "#E41B5B",
                            600: "#C4135D",
                            700: "#A40D5B",
                            800: "#840854",
                            900: "#6D054F",
                            DEFAULT: "#E41B5B",
                        }
                    }
                }
            }
        }),
        viewTransitions({
            styles: {
                "aside-modal": {
                    new: { animation: "from-left 0.3s" },
                    old: { animation: "go-right 0.3s" }
                }
            }
        }),
        ContainerQueries,
        typography({})
    ]
};
export default config;
