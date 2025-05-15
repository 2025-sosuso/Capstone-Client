import {HashtagIcon} from "@heroicons/react/24/outline";

type EmotionBarProps = {
    positive: number;
    negative: number;
    etc: number;
};

export default function EmotionBar({ positive, negative, etc }: EmotionBarProps) {
    return (
        <div className="flex gap-2 items-center">
            <HashtagIcon className="size-6"/>
            <div className="flex items-center text-sm w-full overflow-hidden rounded-full">
      <span
          className="text-blue-500 bg-blue-50 px-4 py-2 text-xs truncate"
          style={{width: `${positive}%`}}
      >
        긍정 {positive}%
      </span>
                <span
                    className="text-red-500 bg-red-50 px-4 py-2 text-xs truncate"
                    style={{width: `${negative}%`}}
                >
        부정 {negative}%
      </span>
                <span
                    className="text-gray-500 bg-gray-50 px-4 py-2 text-xs truncate"
                    style={{width: `${etc}%`}}
                >
        기타 {etc}%
      </span>
            </div>
        </div>
    );
}
