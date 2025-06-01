'use client';

interface CategoryBarProps {
    category: string;
    selected: boolean;
    onClick: () => void;
}

const CategoryBar = ({ category, selected, onClick }: CategoryBarProps) => {
    return (
        <button
            onClick={onClick}
            className={`text-md px-3 py-2 border-b-2 transition-all
                ${selected ? 'border-black text-black font-medium' : 'border-transparent text-gray-500 hover:text-black'}
            `}
        >
            {category}
        </button>
    );
};

export default CategoryBar;