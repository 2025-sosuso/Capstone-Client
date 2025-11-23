/**
 * 유튜브 URL에서 videoId를 추출합니다.
 *
 * 지원 형식:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://m.youtube.com/watch?v=VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/v/VIDEO_ID
 *
 * @param url 유튜브 URL 또는 일반 문자열
 * @returns videoId (11자리) 또는 null
 */
export function extractYoutubeVideoId(url: string): string | null {
    if (!url) {
        return null;
    }

    const VIDEO_ID_PATTERN = /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/|m\.youtube\.com\/watch\?v=)([\w-]{11})/;

    const match = url.match(VIDEO_ID_PATTERN);

    if (match && match[1]) {
        return match[1];
    }

    return null;
}