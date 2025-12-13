import {ConfirmIcon} from "@components/Icons";

interface SelectButtonProps {
    selected: boolean;
    size?: 'sm' | 'md';
}

export default function SelectButton({selected, size = 'md'}: SelectButtonProps) {
    const sizeClasses = size === 'sm'
        ? 'w-7 h-7'
        : 'w-8 h-8';

    const iconSize = size === 'sm'
        ? 'w-4 h-4'
        : 'w-5 h-5';

    return (
        <div className={`${sizeClasses} rounded-full flex items-center justify-center transition-all`}>
            {selected ? (
                <div className={`${sizeClasses} rounded-full bg-blue-500 flex items-center justify-center shadow-[0_4px_12px_rgba(59,130,246,0.5)]`}>
                    <ConfirmIcon className={`${iconSize} text-white drop-shadow-sm`}/>
                </div>
            ) : (
                <div className={`${sizeClasses} rounded-full bg-gray-200 shadow-lg`}/>
            )}
        </div>
    );
}