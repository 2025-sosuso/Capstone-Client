'use client'

import Home from "@components/home";
import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

function ErrorHandler() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    useEffect(() => {
        if (error === 'login-fail') {
            alert("로그인 실패. 다시 시도해주세요.")
            console.warn("로그인 실패. 다시 시도해주세요.");
        }
    }, [error]);

    return null;
}

export default function Page() {
    return (
        <main>
            <Suspense fallback={null}>
                <ErrorHandler />
            </Suspense>
            <Home />
        </main>
    );
}