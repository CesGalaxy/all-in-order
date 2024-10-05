import AppNavbar, { BREADCRUMBS } from "@/app/@navbar/_feature/Navbar";

export default function Page() {
    return <AppNavbar currentPage="subjects" breadcrumbs={[BREADCRUMBS.dash, BREADCRUMBS.topics]}/>
}