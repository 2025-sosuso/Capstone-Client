import {useEffect, useState} from "react";

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