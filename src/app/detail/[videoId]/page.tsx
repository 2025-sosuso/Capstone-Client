import Detail from "@components/detail";

export default async function Page({ params }: { params: Promise<{ videoId: string }> }) {
    const { videoId } = await params;
    return <Detail videoId={videoId} />;
}