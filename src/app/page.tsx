// 📌 src/app/page.tsx (기본 파일)
export default function Home() {
    return (
        <main>
            <h2>Hello</h2>
            <YouTubePlayer /> {/* ✅ Client Component로 분리된 컴포넌트 사용 */}
        </main>
    );
}

// ⚠️ YouTubePlayer를 임포트할 때 "use client"가 포함된 파일을 불러와야 함
import YouTubePlayer from "@/components/YouTubePlayer";
