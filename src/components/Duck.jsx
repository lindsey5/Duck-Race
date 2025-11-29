import { useState, useEffect } from "react";

const Duck = ({
    number,
    maxPos = 100,
    bottom = 32,
    setWinner,
    winner,
    raceStarted,
    onProgress,
}) => {

    const [duckPos, setDuckPos] = useState(0);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        setDuckPos(0);
        setFinished(false);
    }, [raceStarted]);

    useEffect(() => {
        const interval = setInterval(() => {
            setDuckPos(prev => {
                if (finished || winner) return prev;

                const next = prev + Math.random();

                onProgress(number, next);

                if (next >= maxPos) {
                    setFinished(true);
                    setWinner(prev => prev || number);
                    return maxPos;
                }

                return next;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [winner]);

    return (
        <div
            className="absolute w-32 transition-left"
            style={{
                bottom: `${bottom}px`,
                left: `${duckPos}%`,
                zIndex: 10 - number
            }}
        >
            <img src="/duck-toy.png" alt="Duck" className="w-full h-auto" />

            {/* Duck number label */}
            <p className="absolute -top-6 left-1/2 -translate-x-1/2 bg-red-500 text-white 
                rounded-full w-8 h-8 flex items-center justify-center text-sm">
                {number}
            </p>
        </div>
    );
};

export default Duck;
