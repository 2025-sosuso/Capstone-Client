interface TimelineProps {
    timeline: string;
    seekToTime: (seconds:number) => void;
}

const Timeline = ({ timeline, seekToTime }: TimelineProps) => {
    const timeToSecond = (timeline: string) => {
        const times = timeline.split(":").map(Number).reverse();

        let time = 0;
        for (let i = 0; i < times.length; i++)
            time += times[i] * Math.pow(60, i);

        return time;
    }

    return (
        <button
            className="bg-amber-200 p-2"
            onClick={() => seekToTime(timeToSecond(timeline))}
        >
            {timeline}
        </button>
    );
}

export default Timeline;