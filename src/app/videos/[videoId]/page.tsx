import Index from "@/app/videos/[videoId]/_components/Videos";

export default async function Page({ params }: { params: Promise<{ videoId: string }> }) {
    const { videoId } = await params;
    return <Index videoId={videoId} />;
}