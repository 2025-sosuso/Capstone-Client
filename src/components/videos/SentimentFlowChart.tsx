"use client";

import {Line} from 'react-chartjs-2';
import {
    CategoryScale,
    Chart as ChartJS,
    ChartOptions,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    Plugin,
    PointElement,
    Tooltip,
} from 'chart.js';
import {SentimentFlowData} from "@/types";
import {SENTIMENT_FLOW_CHART_COLORS, SENTIMENT_FLOW_CHART_CONFIG} from "@/config/chart.config";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

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

    const chartData = hasValidData ? {
        labels: data.map(item => item.date),
        datasets: [
            {
                label: '긍정',
                data: data.map(item => item.positive),
                backgroundColor: SENTIMENT_FLOW_CHART_COLORS.positive.background,
                borderColor: SENTIMENT_FLOW_CHART_COLORS.positive.border,
                borderWidth: SENTIMENT_FLOW_CHART_CONFIG.borderWidth,
                fill: true,
                tension: SENTIMENT_FLOW_CHART_CONFIG.tension,
            },
            {
                label: '부정',
                data: data.map(item => item.negative),
                backgroundColor: SENTIMENT_FLOW_CHART_COLORS.negative.background,
                borderColor: SENTIMENT_FLOW_CHART_COLORS.negative.border,
                borderWidth: SENTIMENT_FLOW_CHART_CONFIG.borderWidth,
                fill: true,
                tension: SENTIMENT_FLOW_CHART_CONFIG.tension,
            },
            {
                label: '기타',
                data: data.map(item => item.other),
                backgroundColor: SENTIMENT_FLOW_CHART_COLORS.other.background,
                borderColor: SENTIMENT_FLOW_CHART_COLORS.other.border,
                borderWidth: SENTIMENT_FLOW_CHART_CONFIG.borderWidth,
                fill: true,
                tension: SENTIMENT_FLOW_CHART_CONFIG.tension,
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
                borderWidth: SENTIMENT_FLOW_CHART_CONFIG.borderWidth,
                fill: true,
                tension: SENTIMENT_FLOW_CHART_CONFIG.tension,
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
                grid: {
                    display: false,
                },
            },
            y: {
                min: SENTIMENT_FLOW_CHART_CONFIG.minY,
                max: SENTIMENT_FLOW_CHART_CONFIG.maxY,
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
        <div className="w-full" style={{height: `${SENTIMENT_FLOW_CHART_CONFIG.height}px`}}>
            <Line
                key={hasValidData ? 'with-data' : 'no-data'}
                data={chartData}
                options={options}
                plugins={!hasValidData ? [centerTextPlugin] : []}
            />
        </div>
    );
}