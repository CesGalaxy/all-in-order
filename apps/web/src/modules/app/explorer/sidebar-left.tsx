import {
    Blocks,
    Calendar,
    Home,
    Inbox,
    MessageCircleQuestion,
    Search,
    Settings2,
    Sparkles,
    Trash2
} from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@repo/ui/components/sidebar";
import ExplorerNavFavorites from "@/modules/app/explorer/nav-favorites";
import ExplorerNavMain from "@/modules/app/explorer/nav-main";
import ExplorerNavSecondary from "@/modules/app/explorer/nav-secondary";
import ExplorerNavSubjects from "@/modules/app/explorer/nav-subjects";
import WorkspaceSwitcher from "@/modules/app/explorer/workspace-switcher";
import { getMyWorkspaces } from "@/modules/app/workspace/queries";

const data = {
    teams: [
        {
            name: "Acme Inc",
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Search",
            url: "#",
            icon: Search,
        },
        {
            title: "Ask AI",
            url: "#",
            icon: Sparkles,
        },
        {
            title: "Home",
            url: "#",
            icon: Home,
            isActive: true,
        },
        {
            title: "Inbox",
            url: "#",
            icon: Inbox,
            badge: "10",
        },
    ],
    navSecondary: [
        {
            title: "Calendar",
            url: "#",
            icon: Calendar,
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
        },
        {
            title: "Templates",
            url: "#",
            icon: Blocks,
        },
        {
            title: "Trash",
            url: "#",
            icon: Trash2,
        },
        {
            title: "Help",
            url: "#",
            icon: MessageCircleQuestion,
        },
    ],
    favorites: [
        {
            name: "Project Management & Task Tracking",
            url: "#",
            emoji: "📊",
        },
        {
            name: "Family Recipe Collection & Meal Planning",
            url: "#",
            emoji: "🍳",
        },
        {
            name: "Fitness Tracker & Workout Routines",
            url: "#",
            emoji: "💪",
        },
        {
            name: "Book Notes & Reading List",
            url: "#",
            emoji: "📚",
        },
        {
            name: "Sustainable Gardening Tips & Plant Care",
            url: "#",
            emoji: "🌱",
        },
        {
            name: "Language Learning Progress & Resources",
            url: "#",
            emoji: "🗣️",
        },
        {
            name: "Home Renovation Ideas & Budget Tracker",
            url: "#",
            emoji: "🏠",
        },
        {
            name: "Personal Finance & Investment Portfolio",
            url: "#",
            emoji: "💰",
        },
        {
            name: "Movie & TV Show Watchlist with Reviews",
            url: "#",
            emoji: "🎬",
        },
        {
            name: "Daily Habit Tracker & Goal Setting",
            url: "#",
            emoji: "✅",
        },
    ],
    workspaces: [
        {
            name: "Personal Life Management",
            emoji: "🏠",
            pages: [
                {
                    name: "Daily Journal & Reflection",
                    url: "#",
                    emoji: "📔",
                },
                {
                    name: "Health & Wellness Tracker",
                    url: "#",
                    emoji: "🍏",
                },
                {
                    name: "Personal Growth & Learning Goals",
                    url: "#",
                    emoji: "🌟",
                },
            ],
        },
        {
            name: "Professional Development",
            emoji: "💼",
            pages: [
                {
                    name: "Career Objectives & Milestones",
                    url: "#",
                    emoji: "🎯",
                },
                {
                    name: "Skill Acquisition & Training Log",
                    url: "#",
                    emoji: "🧠",
                },
                {
                    name: "Networking Contacts & Events",
                    url: "#",
                    emoji: "🤝",
                },
            ],
        },
        {
            name: "Creative Projects",
            emoji: "🎨",
            pages: [
                {
                    name: "Writing Ideas & Story Outlines",
                    url: "#",
                    emoji: "✍️",
                },
                {
                    name: "Art & Design Portfolio",
                    url: "#",
                    emoji: "🖼️",
                },
                {
                    name: "Music Composition & Practice Log",
                    url: "#",
                    emoji: "🎵",
                },
            ],
        },
        {
            name: "Home Management",
            emoji: "🏡",
            pages: [
                {
                    name: "Household Budget & Expense Tracking",
                    url: "#",
                    emoji: "💰",
                },
                {
                    name: "Home Maintenance Schedule & Tasks",
                    url: "#",
                    emoji: "🔧",
                },
                {
                    name: "Family Calendar & Event Planning",
                    url: "#",
                    emoji: "📅",
                },
            ],
        },
        {
            name: "Travel & Adventure",
            emoji: "🧳",
            pages: [
                {
                    name: "Trip Planning & Itineraries",
                    url: "#",
                    emoji: "🗺️",
                },
                {
                    name: "Travel Bucket List & Inspiration",
                    url: "#",
                    emoji: "🌎",
                },
                {
                    name: "Travel Journal & Photo Gallery",
                    url: "#",
                    emoji: "📸",
                },
            ],
        },
    ],
}

export default function ExplorerSidebarLeft({ workspaceId, ...props }: {workspaceId: string} & React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar className="border-r-0" collapsible="icon" {...props}>
            <SidebarHeader>
                <WorkspaceSwitcher currentWorkspaceId={workspaceId} workspacesQuery={getMyWorkspaces()}/>
                <ExplorerNavMain/>
            </SidebarHeader>
            <SidebarContent>
                <ExplorerNavFavorites favorites={data.favorites}/>
                <ExplorerNavSubjects workspaces={data.workspaces}/>
            </SidebarContent>
            <SidebarFooter>
                <ExplorerNavSecondary className="--mt-auto"/>
            </SidebarFooter>
            <SidebarRail name="left"/>
        </Sidebar>
    )
}