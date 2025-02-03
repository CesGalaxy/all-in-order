import PageContainer from "@/components/containers/PageContainer";
import { Spinner } from "@heroui/spinner";

export default function Loading() {
    return <PageContainer className="flex h-full items-center justify-center">
        <Spinner size="lg" label="Loading..."/>
    </PageContainer>
}