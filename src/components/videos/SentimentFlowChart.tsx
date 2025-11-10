"use client";

import { Line } from 'react-chartjs-2';
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
} from 'chart.js';
import {SentimentFlowData} from "@/types";

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

interface SentimentFlowChartProps {
    data?: SentimentFlowData[];
}

const MOCK_DATA: SentimentFlowData[] = [
    { date: "2024-01-15", positive: 0.67, negative: 0.22, other: 0.11 },
    { date: "2024-01-16", positive: 0.72, negative: 0.19, other: 0.09 },
    { date: "2024-01-17", positive: 0.65, negative: 0.25, other: 0.10 },
    { date: "2024-01-18", positive: 0.70, negative: 0.20, other: 0.10 },
    { date: "2024-01-19", positive: 0.68, negative: 0.22, other: 0.10 },
    { date: "2024-01-20", positive: 0.75, negative: 0.15, other: 0.10 },
    { date: "2024-01-21", positive: 0.80, negative: 0.12, other: 0.08 },
];

export default function SentimentFlowChart({ data = MOCK_DATA }: SentimentFlowChartProps) {
    const convertToPercentage = (values: number[]) => values.map(v => v * 100);

    const labels = data.map(item => item.date);

    const positiveData = convertToPercentage(data.map(item => item.positive));
    const negativeData = convertToPercentage(data.map(item => item.negative));
    const otherData = convertToPercentage(data.map(item => item.other));

    const chartData = {
        labels,
        datasets: [
            {
                label: '긍정',
                data: positiveData,
                backgroundColor: CHART_COLORS.positive.background,
                borderColor: CHART_COLORS.positive.border,
                borderWidth: CHART_CONFIG.borderWidth,
                fill: true,
                tension: CHART_CONFIG.tension,
            },
            {
                label: '부정',
                data: negativeData,
                backgroundColor: CHART_COLORS.negative.background,
                borderColor: CHART_COLORS.negative.border,
                borderWidth: CHART_CONFIG.borderWidth,
                fill: true,
                tension: CHART_CONFIG.tension,
            },
            {
                label: '기타',
                data: otherData,
                backgroundColor: CHART_COLORS.other.background,
                borderColor: CHART_COLORS.other.border,
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
                position: 'top',
                labels: {
                    usePointStyle: true,
                    padding: 15,
                },
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.dataset.label || '';
                        const value = context.parsed.y.toFixed(1);
                        return `${label}: ${value}%`;
                    },
                },
            },
        },
    };

    return (
        <div className="w-full" style={{ height: `${CHART_CONFIG.height}px` }}>
            <Line data={chartData} options={options} />
        </div>
    );
}