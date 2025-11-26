import {useState, useEffect, useCallback} from "react";
import {useAuth} from "@/contexts/AuthContext";
import {createScrap, deleteScrap} from "@/services/video.service";

interface UseScrapParams {
    videoId: string;
    initialScrapId: number | null;
}

export function useScrap({videoId, initialScrapId}: UseScrapParams) {
    const {isLoggedIn, handleLogin} = useAuth();
    const [scrapId, setScrapId] = useState<number | null>(initialScrapId);

    useEffect(() => {
        setScrapId(initialScrapId);
    }, [initialScrapId]);

    const handleScrapToggle = useCallback(async () => {
        if (!isLoggedIn) {
            if (confirm("로그인이 필요한 작업입니다. 로그인하시겠습니까?")) {
                handleLogin();
            }
            return;
        }

        try {
            if (scrapId) {
                await deleteScrap(scrapId);
                setScrapId(null);
            } else {
                const newScrapId = await createScrap(videoId);
                setScrapId(newScrapId);
            }
        } catch (err) {
            console.error("스크랩 요청 실패:", err);
        }
    }, [scrapId, videoId, isLoggedIn, handleLogin]);

    return {scrapId, handleScrapToggle};
}