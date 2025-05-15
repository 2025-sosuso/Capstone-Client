export default function Thumbnail({ src }: { src: string }) {
    return (
        <div className="w-full max-w-[360px] aspect-video rounded-2xl overflow-hidden">
            <img src={src} className="w-full h-full object-cover" alt="썸네일" />
        </div>
    );
}
