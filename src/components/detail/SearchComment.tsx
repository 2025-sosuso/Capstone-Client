'use client';
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {useState} from "react";

export default function SearchComment() {
    const [search, setSearch] = useState('');
    const [isFocus, setFocus] = useState(false);
    const [isComposing, setIsComposing] = useState(false);

    const handleSearch = () => {
        if (!search.trim()) return;
        console.log(search);
        setSearch('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isComposing) {
            handleSearch();
        }
    };

    return (
        <div
            className={`flex w-fit h-fit items-center gap-2 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors duration-200 ${
                isFocus ? "bg-gray-200" : "bg-gray-100"
            }`}
        >
            <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                className="text-sm text-gray-600 focus:outline-none bg-transparent w-[160px] md:w-[200px]"
                placeholder="검색어를 넣어보세요."
            />
            <MagnifyingGlassIcon className="size-4 text-gray-400" />
        </div>
    );
}
