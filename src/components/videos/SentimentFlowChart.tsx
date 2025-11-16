"use client";

import {useMemo} from 'react';
import {Line} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    ChartOptions,
    Plugin,
} from 'chart.js';
import {SentimentFlowData} from "@/types";
import {normalizePercents} from '@/utils/percent';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const CHART_COLORS = {
    positive: {
        background: 'rgba(239, 246, 255, 1)',
        border: 'rgba(59, 130, 246, 0.6)',
    },
    negative: {
        background: 'rgba(254, 242, 242, 1)',
        border: 'rgba(239, 68, 68, 0.6)',
    },
    other: {
        background: 'rgba(249, 250, 251, 1)',
        border: 'rgba(107, 114, 128, 0.6)',
    },
} as const;

const CHART_CONFIG = {
    borderWidth: 1.3,
    tension: 0.4,
    height: 300,
    minY: 0,
    maxY: 100,
} as const;

const centerTextPlugin: Plugin<'line'> = {
    id: 'centerText',
    afterDraw: (chart) => {
        const { ctx, chartArea } = chart;
        if (!chartArea) return;

        const centerX = (chartArea.left + chartArea.right) / 2;
        const centerY = (chartArea.top + chartArea.bottom) / 2;

        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '14px sans-serif';
        ctx.fillStyle = '#9ca3af'; // gray-400
        ctx.fillText('감정 흐름 데이터가 없습니다', centerX, centerY);
        ctx.restore();
    },
};

interface SentimentFlowChartProps {
    data?: SentimentFlowData[];
}

export default function SentimentFlowChart({data}: SentimentFlowChartProps) {
    const hasValidData = data && data.length > 0;

    const normalizedData = useMemo(() => {
        if (!hasValidData) return null;

        return data.map(item => ({
            date: item.date,
            ...normalizePercents({
                positive: item.positive,
                negative: item.negative,
                other: item.other,
            })
        }));
    }, [data, hasValidData]);

    const chartData = normalizedData ? {
        labels: normalizedData.map(item => item.date),
        datasets: [
            {
                label: '긍정',
                data: normalizedData.map(item => item.positive),
                backgroundColor: CHART_COLORS.positive.background,
                borderColor: CHART_COLORS.positive.border,
                borderWidth: CHART_CONFIG.borderWidth,
                fill: true,
                tension: CHART_CONFIG.tension,
            },
            {
                label: '부정',
                data: normalizedData.map(item => item.negative),
                backgroundColor: CHART_COLORS.negative.background,
                borderColor: CHART_COLORS.negative.border,
                borderWidth: CHART_CONFIG.borderWidth,
                fill: true,
                tension: CHART_CONFIG.tension,
            },
            {
                label: '기타',
                data: normalizedData.map(item => item.other),
                backgroundColor: CHART_COLORS.other.background,
                borderColor: CHART_COLORS.other.border,
                borderWidth: CHART_CONFIG.borderWidth,
                fill: true,
                tension: CHART_CONFIG.tension,
            },
        ],
    } : {
        labels: [''],
        datasets: [
            {
                label: '',
                data: [0],
                backgroundColor: 'rgba(229, 231, 235, 0.5)',
                borderColor: 'rgba(229, 231, 235, 0.5)',
                borderWidth: CHART_CONFIG.borderWidth,
                fill: true,
                tension: CHART_CONFIG.tension,
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false,
                },
            },
            y: {
                stacked: true,
                min: CHART_CONFIG.minY,
                max: CHART_CONFIG.maxY,
                ticks: {
                    stepSize: 20,
                    callback: (value) => `${value}%`,
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                },
            },
        },
        plugins: {
            legend: {
                display: hasValidData,
                position: 'top',
                labels: {
                    usePointStyle: true,
                    padding: 15,
                },
            },
            tooltip: {
                enabled: hasValidData,
                callbacks: {
                    label: (context) => {
                        const label = context.dataset.label || '';
                        const value = context.parsed.y;
                        return `${label}: ${value}%`;
                    },
                },
            },
        },
    };

    return (
        <div className="w-full" style={{height: `${CHART_CONFIG.height}px`}}>
            <Line
                data={chartData}
                options={options}
                plugins={!hasValidData ? [centerTextPlugin] : []}
            />
        </div>
    );
}