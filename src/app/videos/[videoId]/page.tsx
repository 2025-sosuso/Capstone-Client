import Index from "@components/Videos";

export default async function Page({ params }: { params: Promise<{ videoId: string }> }) {
    const { videoId } = await params;
    return <Index videoId={videoId} />;
}