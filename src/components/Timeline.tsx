interface TimelineProps {
    timeline: string;
}

export default function Timeline({ timeline }: TimelineProps) {

    const timeToSecond = (timeline: string) => {
        const times = timeline.split(":").map(Number).reverse();

        let time = 0;
        for (let i = 0; i < times.length; i++)
            time += Number(times[i]) * Math.pow(60, i);

        return time;
    }

    return (
        <button
            className="bg-amber-200 p-2"
            onClick={() => timeToSecond(timeline)}
        >
            {timeline}
        </button>
    );
}
