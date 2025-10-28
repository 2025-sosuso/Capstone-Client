'use client'
import {useEffect, useState, useCallback} from "react";
import NotificationIcon from 'public/icons/notification.svg'
import {XMarkIcon} from "@heroicons/react/24/outline";

interface Props {
    message: string;
    onClose: () => void;
}

const Toast = ({message, onClose}: Props) => {
    const [isVisible, setVisible] = useState(false);

    const handleClose = useCallback(() => {
        setVisible(false);
        setTimeout(onClose, 300);
    }, [onClose]);

    useEffect(() => {
        setTimeout(() => setVisible(true), 10);
        const timer = setTimeout(handleClose, 3000);
        return () => clearTimeout(timer);
    }, [handleClose]);

    return (
        <div className={`
            fixed top-4 right-4 z-50
            flex items-center gap-3
            bg-white rounded-lg shadow-lg 
            p-4 min-w-[300px] max-w-md
            transition-all duration-300 ease-out
            ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        `}>
            <div className="flex-shrink-0 size-6">
                <NotificationIcon/>
            </div>

            <div className="flex-1">
                <p className="text-gray-800 whitespace-pre-line">{message}</p>
            </div>

            <button
                onClick={handleClose}
                className="flex-shrink-0 size-5 ml-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
                <XMarkIcon/>
            </button>
        </div>
    );
}

export default Toast;