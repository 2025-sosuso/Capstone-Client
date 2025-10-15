'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { fetchAuthUser } from '@/service/authService';

export default function LoginSuccessPage() {
    const router = useRouter();
    const { setUserData } = useAuth();

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const user = await fetchAuthUser();
                if (!mounted) return;

                if (!user?.userName) {
                    router.replace('/login?error=invalid');
                    return;
                }

                setUserData(user);
                router.replace('/');
            } catch (err) {
                if (!mounted) return;
                const ax = err as AxiosError;
                const status = ax.response?.status;
                router.replace(
                    status === 401 || status === 403
                        ? '/login?error=unauthenticated'
                        : '/login?error=login-fail'
                );
            }
        })();
        return () => { mounted = false; };
    }, [router, setUserData]);

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <div className="animate-spin h-8 w-8 border-2 border-gray-400 border-b-transparent rounded-full mb-3" />
            <p className="text-sm text-gray-500">로그인 중입니다...</p>
        </div>
    );
}