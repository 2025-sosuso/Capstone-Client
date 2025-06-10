import Detail from "src/components/videos";

export default async function Page({ params }: { params: Promise<{ videoId: string }> }) {
    const { videoId } = await params;
    return <Detail videoId={videoId} />;
}