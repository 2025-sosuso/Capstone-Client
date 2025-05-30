'use client'

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useEffect, useMemo, useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
    '#FF6384', '#FF9F40', '#FFCD56', '#4BC0C0', '#36A2EB',
];

interface LanguageRatioItem {
    language: string;
    value: number;
}

interface LanguageChartProps {
    data: LanguageRatioItem[];
}

export default function LanguageChart({ data }: LanguageChartProps) {
    const [showLegend, setShowLegend] = useState(false);

    useEffect(() => {
        const updateLegend = () => {
            setShowLegend(window.innerWidth >= 768);
        };

        updateLegend();
        window.addEventListener('resize', updateLegend);
        return () => window.removeEventListener('resize', updateLegend);
    }, []);

    const chartData = useMemo(() => ({
        labels: data.map((d) => d.language),
        datasets: [
            {
                label: '언어 비율',
                data: data.map((d) => d.value),
                backgroundColor: data.map((_, i) => COLORS[i % COLORS.length]),
                borderWidth: 1,
            },
        ],
    }), [data]);

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
                display: showLegend,
                position: 'right',
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || 'unknown';
                        const value = context.raw || 0;
                        return ` ${label} ${value}%`;
                    },
                },
            },
        },
    }), [showLegend]);

    return (
        <div className="w-full max-w-sm min-w-[16rem] h-[300px] mx-auto p-3">
            <Doughnut data={chartData} options={options} />
        </div>
    );
}
