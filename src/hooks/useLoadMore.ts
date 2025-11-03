import {useState, useEffect} from 'react';

interface UseLoadMoreProps<T> {
    items: T[];
    itemsPerPage?: number;
}

export function useLoadMore<T>({items, itemsPerPage = 20}: UseLoadMoreProps<T>) {
    const [displayedItems, setDisplayedItems] = useState<T[]>([]);
    const [currentPage, setCurrentPage] = useState(0);

    // 아이템 변경 시 초기화
    useEffect(() => {
        const initialItems = items.slice(0, itemsPerPage);
        setDisplayedItems(initialItems);
        setCurrentPage(0);
    }, [items, itemsPerPage]);

    // 더보기
    const loadMore = () => {
        const nextPage = currentPage + 1;
        const startIndex = 0;
        const endIndex = (nextPage + 1) * itemsPerPage;
        const newItems = items.slice(startIndex, endIndex);

        setDisplayedItems(newItems);
        setCurrentPage(nextPage);
    };

    const hasMore = displayedItems.length < items.length;

    return {
        displayedItems,
        hasMore,
        loadMore,
    };
}