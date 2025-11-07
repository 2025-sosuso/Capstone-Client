'use client';

import {useRouter, useSearchParams} from "next/navigation";

type TabType = 'all' | 'video' | 'shorts' | 'channel';

const tabs = [
    {label: '통합', value: 'all' as const},
    {label: '동영상', value: 'video' as const},
    {label: 'Shorts', value: 'shorts' as const},
    {label: '채널', value: 'channel' as const},
];

export default function SearchTabs() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = (searchParams.get('tab') as TabType) || 'all';

    const handleTabChange = (tab: TabType) => {
        const params = new URLSearchParams(searchParams.toString());

        if (tab === 'all') {
            params.delete('tab');
        } else {
            params.set('tab', tab);
        }

        router.push(`/search?${params.toString()}`);
    };

    return (
        <div className="flex border-b border-gray-200 mb-6">
            {tabs.map(({label, value}) => {
                const isActive = activeTab === value;

                return (
                    <button
                        key={value}
                        onClick={() => handleTabChange(value)}
                        className={`
                            px-4 py-3 text-lg font-medium border-b-2 transition-colors
                            ${isActive
                            ? 'border-black text-black'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }
                        `}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    );
}