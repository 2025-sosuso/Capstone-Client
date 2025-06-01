'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginSuccessPage() {
    const router = useRouter();

    useEffect(() => {
        const login = async () => {
            console.log("/login/success: 로그인 처리 시작");

            try {
                const res = await fetch("http://knu-sosuso.com:8080/api/userinfo", {
                    method: "GET",
                    credentials: "include",
                });

                if (!res.ok) {
                    console.warn("유저 정보 요청 실패:", res.status);
                    return router.push("/login?error=unauthorized");
                }

                const token = res.headers.get("Authorization")?.replace("Bearer ", "");
                const user = await res.json();

                if (!token || !user?.userName) {
                    console.warn("응답 데이터 누락:", { token, user });
                    return router.push("/login?error=invalid");
                }

                localStorage.setItem("accessToken", token);
                localStorage.setItem("userInfo", JSON.stringify(user));

                console.log("로그인 성공:", user.userName);
                router.push("/");
            } catch (error) {
                console.error("로그인 예외 발생:", error);
                router.push("/login?error=fail");
            }
        };

        login();
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <div className="animate-spin h-8 w-8 border-2 border-gray-400 border-b-transparent rounded-full mb-3" />
            <p className="text-sm text-gray-500">로그인 중입니다...</p>
        </div>
    );
}
