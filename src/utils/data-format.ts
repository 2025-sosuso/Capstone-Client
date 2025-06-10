export function formatDate(dateString: string, withTime: boolean = false): string {
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    if (withTime) {
        const hh = String(date.getHours()).padStart(2, '0');
        const mi = String(date.getMinutes()).padStart(2, '0');
        return `${yyyy}.${mm}.${dd} ${hh}:${mi}`;
    }

    return `${yyyy}.${mm}.${dd}`;
}

export function formatNumber(num: number): string {
    if (num >= 1_0000_0000) return (num / 1_0000_0000).toFixed(1).replace(/\.0$/, '') + '억';
    if (num >= 1_0000) return (num / 1_0000).toFixed(1).replace(/\.0$/, '') + '만';
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + '천';
    return num.toString();
}