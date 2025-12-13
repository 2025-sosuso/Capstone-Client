'use client';

import {useMainPageData} from '@/hooks/useMainPageData';
import Home from '@components/Home/Home';

export default function Page() {
    const {data, isLoading} = useMainPageData();

    return <Home data={data} isLoading={isLoading}/>;
}