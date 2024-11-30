import AsideModalContainer from "@/components/containers/AsideModal";

export default function Loading() {
    return <AsideModalContainer className="md:max-w-96 md:w-full" animate>
        <h1 className="text-xl font-bold animate-pulse flex items-center justify-center w-full h-full text-center">
            Loading...
        </h1>
    </AsideModalContainer>;
}