import PageContainer from "@/components/containers/PageContainer";
import { Spinner } from "@nextui-org/spinner";

export default function Loading() {
    return <PageContainer className="flex h-full items-center justify-center">
        <Spinner size="lg" label="Loading..."/>
    </PageContainer>
}