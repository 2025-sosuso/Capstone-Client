export function formatDate(iso: string) {
    const date = new Date(iso);
    return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
}
