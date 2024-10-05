import { BreadcrumbItemProps } from "@nextui-org/breadcrumbs";

export const BREADCRUMBS = {
    courses: { href: "/courses", children: "Courses" },
    course: (id: string | number, name: string) => ({ href: `/courses/${id}`, children: name }),
    subjects: { href: "/subjects", children: "Subjects" },
    subject: (id: string | number, name: string) => ({ href: `/subjects/${id}`, children: name }),
    agenda: { href: "/agenda", children: "Agenda" },
    docs: { href: "/content", children: "Documents" },
    dash: { href: "/app", children: "Dashboard" },
    topics: { href: "/topics", children: "Topics" },
    topic: (id: string | number, name: string) => ({ href: `/topics/${id}`, children: name }),
} satisfies Record<string, BreadcrumbItemProps | ((...props: any[]) => BreadcrumbItemProps)>;