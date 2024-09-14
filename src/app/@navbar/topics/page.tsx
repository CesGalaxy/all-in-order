import AppNavbar, { BREADCRUMBS } from "@/app/@navbar/_Navbar";

export default function Page() {
    return <AppNavbar currentPage="subjects" breadcrumbs={[BREADCRUMBS.dash, BREADCRUMBS.topics]}/>
}