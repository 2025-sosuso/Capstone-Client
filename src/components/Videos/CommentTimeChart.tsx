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
    Plugin,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {useMemo} from 'react';
import {calculateYAxis} from '@/utils/calculateYAxis';
import {HourlyCommentCount} from '@/types/video.types';
import {COMMENT_TIME_CHART_COLORS} from "@/config/chart.config";

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

const centerTextPlugin: Plugin<'line'> = {
    id: 'centerText',
    afterDraw: (chart) => {
        const {ctx, chartArea} = chart;
        if (!chartArea) return;

        const centerX = (chartArea.left + chartArea.right) / 2;
        const centerY = (chartArea.top + chartArea.bottom) / 2;

        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '14px sans-serif';
        ctx.fillStyle = '#9ca3af'; // gray-400
        ctx.fillText('시간대별 댓글 데이터가 없습니다', centerX, centerY);
        ctx.restore();
    },
};

interface Props {
    data?: HourlyCommentCount[];
}

export default function CommentTimeChart({data}: Props) {
    const hasValidData = Array.isArray(data) && data.length > 0;

    const maxCount = hasValidData ? Math.max(...data.map((d) => d.count)) : 0;
    const {stepSize, roundedMax} = calculateYAxis(maxCount);

    const chartData = useMemo(() => {
        if (!hasValidData) {
            return {
                labels: [''],
                datasets: [
                    {
                        label: '',
                        data: [0],
                        borderColor: 'rgba(229, 231, 235, 0.8)',
                        backgroundColor: 'rgba(229, 231, 235, 0.4)',
                        fill: true,
                        tension: 0.4,
                    },
                ],
            };
        }

        return {
            labels: data.map((d) => d.hour),
            datasets: [
                {
                    label: '댓글 수',
                    data: data.map((d) => d.count),
                    borderColor: COMMENT_TIME_CHART_COLORS.border,
                    backgroundColor: COMMENT_TIME_CHART_COLORS.background,
                    fill: true,
                    tension: 0.4,
                },
            ],
        };
    }, [data, hasValidData]);

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: hasValidData,
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

    return (
        <div className="w-full min-w-[16rem] h-[250px]">
            <Line
                key={hasValidData ? 'with-data' : 'no-data'}
                data={chartData}
                options={options}
                plugins={!hasValidData ? [centerTextPlugin] : []}
            />
        </div>
    );
}