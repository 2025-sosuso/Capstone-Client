'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    TooltipItem,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useMemo } from 'react';
import { calculateYAxis } from '@/utils/calculateYAxis';
import { HourlyCommentCount } from '@/types/video';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface Props {
    data?: HourlyCommentCount[];
}

export default function CommentTimeChart({ data }: Props) {
    const hasValidData = Array.isArray(data) && data.length > 0;

    const maxCount = hasValidData ? Math.max(...data.map((d) => d.count)) : 0;
    const { stepSize, roundedMax } = calculateYAxis(maxCount);

    const chartData = useMemo(() => ({
        labels: hasValidData ? data.map((d) => d.hour) : [],
        datasets: [
            {
                label: '댓글 수',
                data: hasValidData ? data.map((d) => d.count) : [],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.3)',
                fill: true,
                tension: 0.4,
            },
        ],
    }), [data, hasValidData]);

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: function (context: TooltipItem<'line'>) {
                        const hour = context.label;
                        const count = context.parsed.y;
                        return ` ${hour}에 작성된 댓글: ${count.toLocaleString()}개`;
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    maxRotation: 0,
                    autoSkip: false,
                },
            },
            y: {
                beginAtZero: true,
                max: roundedMax,
                ticks: {
                    stepSize,
                    callback: (value: number | string) => `${value}개`,
                },
            },
        },
    };

    if (!hasValidData) {
        return (
            <div className="w-full min-w-[16rem] h-[250px] flex items-center justify-center rounded-xl bg-gray-50 text-sm text-gray-400">
                시간대별 댓글 데이터가 없습니다.
            </div>
        );
    }

    return (
        <div className="w-full min-w-[16rem] h-[250px]">
            <Line data={chartData} options={options} />
        </div>
    );
}
