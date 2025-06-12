import { ReactNode } from 'react';

interface Props {
    icon: ReactNode;
    title?: string;
    children: ReactNode;
}

export default function SummarySection({ icon, title, children }: Props) {
    return (
        <div className="flex items-start gap-2 w-full">
            <div className={`flex gap-2 items-center pt-2 ${title ? 'min-w-[140px] max-w-[160px]' : 'w-6 justify-center text-gray-600'}`}>
                <div className="w-6 min-w-6 flex justify-center text-gray-600">{icon}</div>
                {title && <span className="text-sm whitespace-nowrap">{title}</span>}
            </div>

            <div className="flex-1 overflow-x-auto">
                {children}
            </div>
        </div>
    );
}
