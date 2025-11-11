'use client';

import {createContext, useContext, useState, useMemo, useCallback} from 'react';
import {useRouter} from 'next/navigation';
import type {VideoSummaryItem} from '@/types/video-preview.types';

interface CompareContextType {
    compareMode: boolean;
    selectedVideos: VideoSummaryItem[];
    toggleCompareMode: () => void;
    selectVideo: (video: VideoSummaryItem) => void;
    isSelected: (videoId: string) => boolean;
    clearSelection: () => void;
    goToCompare: () => void;
}

const CompareContext = createContext<CompareContextType | null>(null);

export const CompareProvider = ({children}: { children: React.ReactNode }) => {
    const router = useRouter();
    const [compareMode, setCompareMode] = useState(false);
    const [selectedVideos, setSelectedVideos] = useState<VideoSummaryItem[]>([]);

    const toggleCompareMode = useCallback(() => {
        setCompareMode((prev) => {
            if (prev) {
                setSelectedVideos([]);
            }
            return !prev;
        });
    }, []);

    const selectVideo = useCallback((video: VideoSummaryItem) => {
        setSelectedVideos((prev) => {
            const isAlreadySelected = prev.some((v) => v.video.id === video.video.id);

            if (isAlreadySelected) {
                return prev.filter((v) => v.video.id !== video.video.id);
            } else {
                if (prev.length >= 3) {
                    alert('최대 3개까지 선택할 수 있습니다.');
                    return prev;
                }
                return [...prev, video];
            }
        });
    }, []);

    const isSelected = useCallback(
        (videoId: string) => {
            return selectedVideos.some((v) => v.video.id === videoId);
        },
        [selectedVideos]
    );

    const clearSelection = useCallback(() => {
        setSelectedVideos([]);
    }, []);

    const goToCompare = useCallback(() => {
        if (selectedVideos.length < 2) {
            alert('최소 2개 이상의 영상을 선택해주세요.');
            return;
        }

        const ids = selectedVideos.map((v) => v.video.id).join(',');
        router.push(`/compare?ids=${ids}`);
    }, [selectedVideos, router]);

    const value = useMemo(
        () => ({
            compareMode,
            selectedVideos,
            toggleCompareMode,
            selectVideo,
            isSelected,
            clearSelection,
            goToCompare,
        }),
        [compareMode, selectedVideos, toggleCompareMode, selectVideo, isSelected, clearSelection, goToCompare]
    );

    return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
};

export const useCompare = () => {
    const ctx = useContext(CompareContext);
    if (!ctx) throw new Error('useCompare must be used within CompareProvider');
    return ctx;
};