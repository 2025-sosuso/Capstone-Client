'use client';

import {useEffect} from 'react';
import {useCompare} from "@/contexts/CompareContext";
import {XMarkIcon} from '@heroicons/react/24/outline';
import Image from 'next/image';

const MAX_SLOTS = 3;

export default function CompareActions() {
    const {compareMode, toggleCompareMode, selectedVideos, selectVideo, goToCompare} = useCompare();

    const emptySlotCount = MAX_SLOTS - selectedVideos.length;
    const canCompare = selectedVideos.length >= 2;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && compareMode) {
                toggleCompareMode();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [compareMode, toggleCompareMode]);

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
            <ToggleButton isOpen={compareMode} onClick={toggleCompareMode}/>
            <Panel isOpen={compareMode}>
                <PanelHeader onClose={toggleCompareMode}/>
                <SlotList
                    videos={selectedVideos}
                    emptyCount={emptySlotCount}
                    onRemove={selectVideo}
                />
                <CompareButton enabled={canCompare} onClick={goToCompare}/>
            </Panel>
        </div>
    );
}

function ToggleButton({isOpen, onClick}: { isOpen: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`
                px-4 py-2.5 sm:px-5 sm:py-3 bg-white text-gray-700 rounded-2xl shadow-lg font-medium text-sm sm:text-base border border-gray-200
                hover:shadow-xl hover:scale-105 transition-all duration-300 ease-out
                ${isOpen ? 'scale-0 opacity-0 pointer-events-none absolute' : 'scale-100 opacity-100'}
            `}
        >
            영상 비교
        </button>
    );
}

function Panel({isOpen, children}: { isOpen: boolean; children: React.ReactNode }) {
    return (
        <div
            className={`
                bg-white rounded-2xl shadow-2xl p-3 sm:p-4 w-auto sm:w-64 origin-bottom-right
                transition-all duration-300 ease-out
                ${isOpen
                ? 'scale-100 opacity-100 translate-y-0'
                : 'scale-90 opacity-0 translate-y-4 pointer-events-none absolute'}
            `}
        >
            {children}
        </div>
    );
}

function PanelHeader({onClose}: { onClose: () => void }) {
    return (
        <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="w-5 sm:w-6"/>
            <h3 className="font-semibold text-gray-800 text-xs sm:text-base whitespace-nowrap">영상 비교</h3>
            <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
                <XMarkIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"/>
            </button>
        </div>
    );
}

function SlotList({videos, emptyCount, onRemove}: {
    videos: ReturnType<typeof useCompare>['selectedVideos'];
    emptyCount: number;
    onRemove: (video: ReturnType<typeof useCompare>['selectedVideos'][number]) => void;
}) {
    return (
        <div className="flex flex-col gap-2 mb-3 items-center sm:items-stretch">
            {videos.map((video) => (
                <VideoSlot key={video.video.id} video={video} onRemove={() => onRemove(video)}/>
            ))}
            {Array.from({length: emptyCount}, (_, i) => (
                <EmptySlot key={`empty-${i}`}/>
            ))}
        </div>
    );
}

function VideoSlot({video, onRemove}: {
    video: ReturnType<typeof useCompare>['selectedVideos'][number];
    onRemove: () => void;
}) {
    return (
        <div className="relative rounded-full sm:rounded-xl overflow-hidden w-14 h-14 sm:w-full sm:h-auto sm:aspect-video flex-shrink-0 transition-all duration-200 hover:ring-2 hover:ring-blue-300">
            <Image
                src={video.video.thumbnailUrl}
                alt={video.video.title || '영상 썸네일'}
                fill
                className="object-cover"
                unoptimized
            />
            <button
                onClick={onRemove}
                className="absolute -top-0.5 -right-0.5 sm:top-2 sm:right-2 p-0.5 sm:p-1.5 bg-black/60 rounded-full hover:bg-black/80 transition-colors cursor-pointer"
            >
                <XMarkIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white stroke-2"/>
            </button>
        </div>
    );
}

function EmptySlot() {
    return (
        <div className="w-14 h-14 sm:w-full sm:h-auto sm:aspect-video bg-gray-100 rounded-full sm:rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-gray-400 text-xs sm:text-sm hidden sm:block">영상을 선택하세요</span>
        </div>
    );
}

function CompareButton({enabled, onClick}: { enabled: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            disabled={!enabled}
            className={`
                w-full py-1.5 sm:py-2.5 rounded-xl font-medium text-xs sm:text-base transition-all duration-200
                ${enabled
                ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer active:scale-98'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
            `}
        >
            비교하기
        </button>
    );
}