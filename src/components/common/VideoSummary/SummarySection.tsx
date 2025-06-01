import { ReactNode } from 'react';

interface SummarySectionProps {
    icon: ReactNode;
    children: ReactNode;
}

export default function SummarySection({ icon, children }: SummarySectionProps) {
    return (
        <div className="flex items-center gap-2">
            <div className="w-6 min-w-6 flex justify-center text-gray-600">
                {icon}
            </div>

            <div className="flex-1 overflow-x-auto">
                {children}
            </div>
        </div>
    );
}
