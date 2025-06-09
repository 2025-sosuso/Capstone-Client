import Detail from "@components/detail";

interface Props {
    params: { videoId: string };
}

export default function Page({ params }: Props) {
    return <Detail videoId={params.videoId} />;
}