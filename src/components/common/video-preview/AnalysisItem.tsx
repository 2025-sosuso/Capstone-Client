import { ReactNode } from 'react';
import {BREAKPOINTS, useIsNarrow} from "@/hooks/useIsNarrow";

interface Props {
    icon: ReactNode;
    title?: string;
    children: ReactNode;
}

export default function AnalysisItem({ icon, title, children }: Props) {
    const isNarrow = useIsNarrow(BREAKPOINTS.lg);

    return (
        <div className="flex items-start gap-2 w-full">
            <div className={`flex gap-2 items-center pt-2 ${title && !isNarrow ? 'min-w-[140px] max-w-[160px]' : 'w-6 justify-center text-gray-600'}`}>
                <div className="w-6 min-w-6 flex justify-center text-gray-600">{icon}</div>
                {title && !isNarrow && <span className="text-sm whitespace-nowrap">{title}</span>}
            </div>

            <div className="flex-1 overflow-x-auto">
                {children}
            </div>
        </div>
    );
}