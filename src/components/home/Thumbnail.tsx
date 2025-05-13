import {mockVideoData} from "@mock/video";

export default function Thumbnail() {
    return (
        <div className="w-full max-w-[360px] aspect-video rounded-2xl overflow-hidden">
            <img
                src={mockVideoData[0].thumbnailUrl}
                className="w-full h-full object-cover"
                alt="썸네일"
            />
        </div>
    );
}

