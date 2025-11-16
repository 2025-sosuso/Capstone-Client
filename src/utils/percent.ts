type SentimentType = 'positive' | 'negative' | 'other';

interface SentimentRatio {
    positive: number;
    negative: number;
    other: number;
}

export function normalizePercents(ratio: SentimentRatio): Record<SentimentType, number> {
    if (!ratio || typeof ratio !== 'object') {
        return {positive: 0, negative: 0, other: 0};
    }

    const order: SentimentType[] = ['positive', 'negative', 'other'];

    const entries: Array<[SentimentType, number, number]> = order.map((key) => {
        const value = ratio[key] || 0;
        const percent = value * 100;
        const floored = Math.floor(percent);
        const remainder = percent - floored;
        return [key, floored, remainder];
    });

    const sum = entries.reduce((acc, [, floored]) => acc + floored, 0);

    const diff = 100 - sum;

    const sortedByRemainder = [...entries]
        .map((entry, index) => ({entry, index}))
        .sort((a, b) => b.entry[2] - a.entry[2]);

    const maxIterations = Math.min(diff, sortedByRemainder.length);

    for (let i = 0; i < maxIterations; i++) {
        const targetIndex = sortedByRemainder[i].index;
        entries[targetIndex][1] += 1;
    }

    return entries.reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {} as Record<SentimentType, number>);
}