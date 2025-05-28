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
import {calculateYAxis} from "@/utils/calculateYAxis";

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

interface CommentTimeData {
    time: string;
    count: number;
}

interface Props {
    data: CommentTimeData[];
}

export default function CommentTimeChart({ data }: Props) {
    const maxCount = Math.max(...data.map((d) => d.count));
    const { stepSize, roundedMax } = calculateYAxis(maxCount);

    const chartData = useMemo(() => {
        return {
            labels: data.map((d) => d.time),
            datasets: [
                {
                    label: '댓글 수',
                    data: data.map((d) => d.count),
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.3)',
                    fill: true,
                    tension: 0.4,
                },
            ],
        };
    }, [data]);

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context: TooltipItem<'line'>) {
                        const hour = context.label;
                        const count = context.parsed.y;
                        return ` ${hour}에 작성된 댓글: ${count.toLocaleString()}개`;
                    }
                }
            }
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
                    callback: (value: string | number) => `${value}개`,
                }
            },
        },
    };

    return (
        <div className="w-full max-w-sm min-w-[16rem] h-[250px] mx-auto p-1">
            <Line data={chartData} options={options} />
        </div>
    );
}
