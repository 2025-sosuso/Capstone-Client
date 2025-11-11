'use client'

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartOptions,
    Plugin,
} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import {useEffect, useMemo, useState} from 'react';
import {LanguageRatio} from "@/types/video.types";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
    'rgba(248, 113, 113, 0.7)',  // red-400
    'rgba(251, 146, 60, 0.7)',   // orange-400
    'rgba(74, 222, 128, 0.7)',   // green-400
    'rgba(96, 165, 250, 0.7)',   // blue-400
    'rgba(167, 139, 250, 0.7)',  // violet-400
    'rgba(148, 163, 184, 0.7)',  // slate-400
    'rgba(251, 191, 36, 0.7)',   // amber-400
    'rgba(34, 211, 238, 0.7)',   // cyan-400
    'rgba(56, 189, 248, 0.7)',   // sky-400
    'rgba(244, 114, 182, 0.7)',  // pink-400
] as const;

// 차트 중앙에 텍스트를 그리는 플러그인
const centerTextPlugin: Plugin<'doughnut'> = {
    id: 'centerText',
    beforeDraw: (chart) => {
        const {ctx, chartArea} = chart;
        if (!chartArea) return;

        const centerX = (chartArea.left + chartArea.right) / 2;
        const centerY = (chartArea.top + chartArea.bottom) / 2;

        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '14px sans-serif';
        ctx.fillStyle = '#9ca3af'; // gray-400
        ctx.fillText('언어 데이터 없음', centerX, centerY);
        ctx.restore();
    },
};

interface LanguageChartProps {
    data?: LanguageRatio[];
}

export default function LanguageChart({data}: LanguageChartProps) {
    const [showLegend, setShowLegend] = useState(false);

    useEffect(() => {
        const updateLegend = () => {
            setShowLegend(window.innerWidth >= 768);
        };

        updateLegend();
        window.addEventListener('resize', updateLegend);
        return () => window.removeEventListener('resize', updateLegend);
    }, []);

    const hasValidData = Array.isArray(data) && data.length > 0 && data.some(d => d.ratio > 0);

    const chartData = useMemo(() => {
        if (!hasValidData) {
            return {
                labels: [''],
                datasets: [
                    {
                        data: [100],
                        backgroundColor: ['rgba(229, 231, 235, 0.5)'],
                        borderWidth: 0,
                    },
                ],
            };
        }

        return {
            labels: data?.map((d) => d.language),
            datasets: [
                {
                    label: '언어 비율',
                    data: data?.map((d) => d.ratio),
                    backgroundColor: data?.map((_, i) => COLORS[i % COLORS.length]),
                    borderWidth: 1,
                },
            ],
        };
    }, [data, hasValidData]);

    const options = useMemo<ChartOptions<'doughnut'>>(() => ({
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                right: 30,
            },
        },
        plugins: {
            legend: {
                display: hasValidData && showLegend,
                position: 'right',
            },
            tooltip: {
                enabled: hasValidData,
                callbacks: {
                    label: (context) => {
                        const label = context.label || 'unknown';
                        const value = context.raw || 0;
                        return ` ${label} ${value}%`;
                    },
                },
            },
        },
    }), [showLegend, hasValidData]);

    return (
        <div className="w-full max-w-sm min-w-[16rem] h-[300px] mx-auto p-3">
            <Doughnut
                data={chartData}
                options={options}
                plugins={!hasValidData ? [centerTextPlugin] : []}
            />
        </div>
    );
}