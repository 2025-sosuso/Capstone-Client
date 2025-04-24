'use client';

import { useState } from 'react';

export default function HeaderSearch() {
    const [search, setSearch] = useState('');

    const handleSearch = () => {
        console.log(search);
        setSearch('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex items-center w-full max-w-2xl border border-gray-300 rounded-full">
            <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="채널 혹은 링크를 넣어보세요"
                className="flex-1 pl-4 pr-3 py-2 text-gray-700 text-sm focus:outline-none rounded-l-full hover:bg-gray-100 transition-colors duration-200"
            />
            <div
                onClick={handleSearch}
                className="pl-3 pr-4 py-2 hover:bg-gray-100 transition-colors duration-200 rounded-r-full cursor-pointer"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
                </svg>
            </div>
        </div>
    );
}
