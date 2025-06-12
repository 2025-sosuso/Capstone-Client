import TagItem from "./TagItem";

interface TagListProps {
    tags?: string[];
    size?: "sm" | "md";
    onTagClick?: (tag: string) => void;
    selectedTag?: string | null;
    highlightSelected?: boolean;
}

export default function TagList({
                                    tags,
                                    size = "md",
                                    onTagClick,
                                    selectedTag,
                                    highlightSelected = false,
                                }: TagListProps) {
    const hasTags = Array.isArray(tags) && tags.length > 0;

    if (!hasTags) {
        return (
            <div className="w-full px-4 py-3 rounded-md bg-gray-50 text-center text-sm text-gray-400">
                키워드 데이터가 없습니다.
            </div>
        );
    }

    return (
        <div className="flex gap-2 overflow-x-auto items-center">
            {tags.map((tag, i) => (
                <TagItem
                    key={i}
                    text={tag}
                    size={size}
                    isSelected={highlightSelected && selectedTag === tag}
                    onClick={() => onTagClick?.(tag)}
                />
            ))}
        </div>
    );
}
