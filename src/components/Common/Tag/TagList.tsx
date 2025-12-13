import TagItem from "./TagItem";
import EmptyState from "@components/Common/EmptyState";

interface TagListProps {
    tags?: string[];
    size?: "sm" | "md";
    onTagClick?: (tag: string) => void;
    selectedTag?: string | null;
    highlightSelected?: boolean;
    isLoading?: boolean;
}

export default function TagList({
                                    tags,
                                    size = "md",
                                    onTagClick,
                                    selectedTag,
                                    highlightSelected = false,
                                    isLoading = false,
                                }: TagListProps) {
    const hasTags = Array.isArray(tags) && tags.length > 0;

    if (isLoading) {
        return <EmptyState message="키워드 분석 중입니다" variant="loading" />;
    }

    if (!hasTags) {
        return <EmptyState message="키워드 데이터가 없습니다." />;
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