import {useState, useCallback, useEffect} from "react";
import {useAuth} from "@/contexts/AuthContext";
import {addFavoriteChannel, removeFavoriteChannel} from "@/services/channel.service";

interface UseFavoriteChannelProps {
    channelId: string;
    channelTitle: string;
    channelThumbnail: string;
    initialFavoriteId: number | null;
}

export function useFavoriteChannel({
                                       channelId,
                                       channelTitle,
                                       channelThumbnail,
                                       initialFavoriteId,
                                   }: UseFavoriteChannelProps) {
    const [favoriteChannelId, setFavoriteChannelId] = useState<number | null>(initialFavoriteId);
    const {isLoggedIn, handleLogin} = useAuth();

    useEffect(() => {
        setFavoriteChannelId(initialFavoriteId);
    }, [initialFavoriteId]);

    const requireLogin = useCallback(() => {
        if (!isLoggedIn) {
            if (confirm("로그인이 필요한 작업입니다. 로그인하시겠습니까?")) {
                handleLogin();
            }
            return true;
        }
        return false;
    }, [isLoggedIn, handleLogin]);

    const handleFavoriteToggle = useCallback(async () => {
        if (requireLogin()) return;

        try {
            if (favoriteChannelId != null) {
                console.log(`[관심 해제] 채널 ID: ${channelId}, 이름: ${channelTitle}`);
                await removeFavoriteChannel(favoriteChannelId);
                setFavoriteChannelId(null);
            } else {
                console.log(`[관심 등록] 채널 ID: ${channelId}, 이름: ${channelTitle}`);
                const newFavoriteChannelId = await addFavoriteChannel(
                    channelId,
                    channelTitle,
                    channelThumbnail
                );
                setFavoriteChannelId(newFavoriteChannelId);
                console.log(`관심 채널 등록 완료, 새 ID: ${newFavoriteChannelId}`);
            }
        } catch (err) {
            console.error("관심 채널 처리 실패:", err);
        }
    }, [favoriteChannelId, channelId, channelTitle, channelThumbnail, requireLogin]);

    return {
        favoriteChannelId,
        handleFavoriteToggle,
        isFavorite: favoriteChannelId != null,
    };
}