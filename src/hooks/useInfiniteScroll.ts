import {useState, useEffect} from "react";
import {useSearchParams} from "next/navigation";
import {useInView} from "react-intersection-observer";
import type {VideoSummaryItem} from "@/types/video-preview.types";

type SearchFunction = (query: string, pageToken?: string) => Promise<{
    results: VideoSummaryItem[];
    nextPageToken: string | null;
    hasMore: boolean;
}>;

interface UseInfiniteScrollProps {
    initialData: VideoSummaryItem[];
    initialNextPageToken: string | null;
    initialHasMore: boolean;
    searchFunction: SearchFunction;
}

export function useInfiniteScroll({
                                      initialData,
                                      initialNextPageToken,
                                      initialHasMore,
                                      searchFunction,
                                  }: UseInfiniteScrollProps) {
    const searchParams = useSearchParams();
    const query = searchParams.get("q");

    const [data, setData] = useState(initialData || []);
    const [nextPageToken, setNextPageToken] = useState(initialNextPageToken);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const {ref, inView} = useInView({threshold: 0});

    // 초기 데이터 업데이트
    useEffect(() => {
        setData(initialData || []);
        setNextPageToken(initialNextPageToken);
        setHasMore(initialHasMore);
    }, [initialData, initialNextPageToken, initialHasMore]);

    // 무한 스크롤 트리거
    useEffect(() => {
        if (!inView || !hasMore || isLoadingMore || !query || !nextPageToken) return;

        const loadMore = async () => {
            setIsLoadingMore(true);
            try {
                const result = await searchFunction(query, nextPageToken);
                setData((prev) => [...prev, ...result.results]);
                setNextPageToken(result.nextPageToken);
                setHasMore(result.hasMore);
            } catch (error) {
                console.error("다음 페이지 로드 실패:", error);
                setHasMore(false);
            } finally {
                setIsLoadingMore(false);
            }
        };

        loadMore();
    }, [inView, hasMore, isLoadingMore, query, nextPageToken, searchFunction]);

    return {data, hasMore, isLoadingMore, scrollRef: ref};
}