import Profile from "@/components/study/Profile";
import Counter from "@/components/study/Counter";

export default function Home() {
    return (
        <main>
            {/*<YouTubePlayer />*/}
            <Profile name="얍" job="호잇" />
            <Counter />
        </main>
    );
}

// ⚠️ YouTubePlayer를 임포트할 때 "use client"가 포함된 파일을 불러와야 함
// import YouTubePlayer from "@/components/youtube/YouTubePlayer";
