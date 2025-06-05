'use client';

import { useSearchParams } from "next/navigation";

export default function LoginFallbackPage() {
    const params = useSearchParams();
    const error = params.get("error");

    const errorMessage = {
        unauthorized: "로그인 인증이 실패했습니다. 다시 시도해주세요.",
        invalid: "로그인 정보가 유효하지 않습니다.",
        '': "다시 로그인해주세요.",
    }[error ?? ''] || "알 수 없는 오류가 발생했습니다.";

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <p className="text-xl font-semibold">{errorMessage}</p>
            <button
                className="mt-10 px-4 py-2 bg-red-600 text-white rounded-xl"
                onClick={() => window.location.href = "/"}
            >
                홈으로 돌아가기
            </button>
        </div>
    );
}
