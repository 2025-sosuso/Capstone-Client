'use client'

import Home from "@components/home";
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    useEffect(() => {
        if (error === 'login-fail') {
            alert("로그인 실패. 다시 시도해주세요.")
            console.warn("로그인 실패. 다시 시도해주세요.");
        }
    }, [error]);

    return (
        <main>
            <Home />
        </main>
    );
}