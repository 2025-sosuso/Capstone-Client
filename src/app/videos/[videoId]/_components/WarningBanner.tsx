import { useState, useEffect } from "react";

const WarningBanner = () => {
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowText(true), 200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex items-center w-full px-5 py-2 rounded-full gap-3 bg-amber-100/50 overflow-hidden">
            <span className="text-lg">⚠️</span>
            <span
                className={`
                    inline-block text-[0.95rem]  text-amber-700 transition-all duration-800 ease-in-out whitespace-nowrap overflow-hidden
                    ${showText ? "opacity-100 max-w-[500px]" : "opacity-0 max-w-0"}
                `}
            >
                AI가 논란 키워드 일부를 감지했어요. 내용을 참고해 시청을 결정해 주세요.
            </span>
        </div>
    );
};

export default WarningBanner;
