interface Props {
    children: React.ReactNode;
    className?: string;
}

const MenuItem = ({ children, className = '' }: Props) => {
    return (
        <div className={`p-3 text-gray-700 text-md rounded-lg whitespace-nowrap hover:bg-gray-100 ${className}`}>
            {children}
        </div>
    );
};

export default MenuItem;
