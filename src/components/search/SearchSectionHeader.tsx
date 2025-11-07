'use client';

import {ChevronRightIcon} from "@heroicons/react/24/outline";

interface Props {
    title: string;
    onClick: () => void;
}

export default function SearchSectionHeader({title, onClick}: Props) {
    return (
        <div
            className="flex items-center justify-between cursor-pointer group mb-4"
            onClick={onClick}
        >
            <h3 className="text-xl font-semibold group-hover:text-gray-700 transition-colors">
                {title}
            </h3>
            <ChevronRightIcon className="size-5 text-gray-400 group-hover:text-gray-600 transition-colors"/>
        </div>
    );
}