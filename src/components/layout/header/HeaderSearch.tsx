'use client';

import {useState, useEffect, Suspense} from 'react';
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {useRouter, useSearchParams} from "next/navigation";

type Props = {
    isNarrow: boolean;
};

function SearchInput({ isNarrow }: Props) {
    const [search, setSearch] = useState('');
    const [isComposing, setIsComposing] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const queryFromUrl = searchParams.get('q') || '';
        setSearch(queryFromUrl);
    }, [searchParams]);

    const handleSearch = () => {
        if (!search.trim()) return;
        router.push(`/search?q=${encodeURIComponent(search)}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isComposing) handleSearch();
    };

    return (
        <div
            className={`${
                isNarrow
                    ? 'inline-flex w-auto'
                    : 'flex w-full ml-10 max-w-2xl'
            } items-center border border-gray-300 rounded-full`}
        >
            <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                placeholder={
                    isNarrow
                        ? "검색어나 링크를 넣어보세요."
                        : "영상과 채널을 검색하거나 링크를 넣어보세요."
                }
                className={`text-gray-700 text-sm focus:outline-none rounded-l-full hover:bg-gray-100 transition-colors duration-200
          ${
                    isNarrow
                        ? 'flex-none w-52 pl-3 pr-2 py-2'
                        : 'flex-1 pl-4 pr-3 py-2'
                }`}
            />
            <button
                type="button"
                onClick={handleSearch}
                className="pl-3 pr-4 py-2 hover:bg-gray-100 transition-colors duration-200 rounded-r-full"
            >
                <MagnifyingGlassIcon className="size-5 text-gray-400 stroke-2"/>
            </button>
        </div>
    );
}

function SearchInputFallback({ isNarrow }: Props) {
    return (
        <div
            className={`${
                isNarrow
                    ? 'inline-flex w-auto'
                    : 'flex w-full ml-10 max-w-2xl'
            } items-center border border-gray-300 rounded-full`}
        >
            <input
                type="text"
                disabled
                value=""
                placeholder={
                    isNarrow
                        ? "검색어나 링크를 넣어보세요."
                        : "영상과 채널을 검색하거나 링크를 넣어보세요."
                }
                className={`text-gray-700 text-sm focus:outline-none rounded-l-full hover:bg-gray-100 transition-colors duration-200
          ${
                    isNarrow
                        ? 'flex-none w-52 pl-3 pr-2 py-2'
                        : 'flex-1 pl-4 pr-3 py-2'
                }`}
            />
            <button
                type="button"
                disabled
                className="pl-3 pr-4 py-2 hover:bg-gray-100 transition-colors duration-200 rounded-r-full"
            >
                <MagnifyingGlassIcon className="size-5 text-gray-400 stroke-2"/>
            </button>
        </div>
    );
}

export default function HeaderSearch({ isNarrow }: Props) {
    return (
        <Suspense fallback={<SearchInputFallback isNarrow={isNarrow} />}>
            <SearchInput isNarrow={isNarrow} />
        </Suspense>
    );
}