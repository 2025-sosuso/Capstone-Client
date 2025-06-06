'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {useAuth} from "@/contexts/AuthContext";

export default function LoginSuccessPage() {
    const router = useRouter();
    const { setUserData } = useAuth();

    useEffect(() => {
        const login = async () => {
            try {
                const res = await fetch('https://knu-sosuso.com/api/auth/login', {
                    credentials: 'include',  /**/
                });

                if (!res.ok) {
                    console.warn('유저 정보 요청 실패:', res.status);
                    return router.push('/?error=unauthorized');
                }

                const response = await res.json();
                console.log('로그인 응답:', response);
                const userData = response?.data?.body;

                if (!userData?.userName) {
                    console.warn('유저 정보 누락:', userData);
                    return router.push('/?error=invalid');
                }

                setUserData(userData);
                router.push('/');
            } catch (error) {
                console.error('로그인 처리 중 예외:', error);
                router.push('/?error=login-fail');
            }
        };

        login();
    }, [router, setUserData]);

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <div className="animate-spin h-8 w-8 border-2 border-gray-400 border-b-transparent rounded-full mb-3" />
            <p className="text-sm text-gray-500">로그인 중입니다...</p>
        </div>
    );
}
