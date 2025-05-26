import Tag from "@components/detail/Tag";

export default function TagList({ tags }: { tags: string[] }) {
    return (
        <div className="flex gap-2 overflow-x-auto">
            {tags.map(tag => (
                <Tag key={tag} text={tag} />
            ))}
        </div>
    );
}
