import {mockVideoData} from "@mock/video";

export default function Thumbnail() {
    return (
        <img
            className="w-100 rounded-2xl"
            src={mockVideoData[0].thumbnailUrl}>
        </img>
    );
}