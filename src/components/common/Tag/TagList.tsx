import Tag from "./Tag";

type TagListProps = {
    tags: string[];
    size?: "sm" | "md";
};

export default function TagList({tags, size = "md"}: TagListProps) {
    return (
        <div className="flex gap-2 overflow-x-auto items-center">
            {tags.map((tag, i) => (
                <Tag key={i} text={tag} size={size}/>
            ))}
        </div>
    );
}
