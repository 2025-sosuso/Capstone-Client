import { useState, useEffect, useCallback, RefObject } from "react";

interface SelectionPosition {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface UseTextSelectionReturn {
    selectedText: string;
    position: SelectionPosition | null;
    clearSelection: () => void;
}

export function useTextSelection<T extends HTMLElement = HTMLElement>(
    containerRef: RefObject<T | null>
): UseTextSelectionReturn {
    const [selectedText, setSelectedText] = useState("");
    const [position, setPosition] = useState<SelectionPosition | null>(null);

    const clearSelection = useCallback(() => {
        setSelectedText("");
        setPosition(null);
    }, []);

    const handleSelection = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        const selection = window.getSelection();
        const text = selection?.toString().trim() || "";

        if (!text || !selection || selection.rangeCount === 0) {
            clearSelection();
            return;
        }

        const range = selection.getRangeAt(0);
        if (!container.contains(range.commonAncestorContainer)) {
            clearSelection();
            return;
        }

        // 100자 이상 제외
        if (text.length > 100) {
            clearSelection();
            return;
        }

        const rect = range.getBoundingClientRect();

        setSelectedText(text);
        setPosition({
            x: rect.left + rect.width / 2,  // viewport 기준 중앙 X
            y: rect.top,  // viewport 기준 상단 Y
            width: rect.width,
            height: rect.height,
        });
    }, [containerRef, clearSelection]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener("mouseup", handleSelection);

        return () => {
            container.removeEventListener("mouseup", handleSelection);
        };
    }, [containerRef, handleSelection]);

    return { selectedText, position, clearSelection };
}