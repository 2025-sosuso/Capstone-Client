export default function AISummary({summary}: { summary: string }) {
    return (
        <p className="text-md w-full text-purple-800 bg-purple-50 px-4 py-4 rounded-xl whitespace-pre-line">
            {summary}
        </p>

    )
}