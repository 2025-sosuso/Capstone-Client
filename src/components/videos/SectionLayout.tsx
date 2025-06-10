import SearchComment from "@components/videos/SearchComment";

interface Props {
    header: string;
    type?: string;
    children: React.ReactNode;
}

export default function SectionLayout({ header, type, children }: Props) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap justify-between gap-2">
                <h1 className="text-lg font-semibold">{header}</h1>
                {type === "search-comment" && <SearchComment />}
            </div>
            {children}
        </div>
    );
}
