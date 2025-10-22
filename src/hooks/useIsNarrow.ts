import {useEffect, useState} from "react";

export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
} as const;

export function useIsNarrow(breakpoint = 640) {
    const [isNarrow, setIsNarrow] = useState(false);

    useEffect(() => {
        const update = () => {
            const narrow = window.innerWidth < breakpoint;
            setIsNarrow(narrow);
        };

        update();

        let raf = 0;
        const onResize = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(update);
        };

        window.addEventListener('resize', onResize);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', onResize);
        };
    }, [breakpoint]);

    return isNarrow;
}