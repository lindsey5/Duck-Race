import { useState, useEffect } from "react";

const Duck = ({ number, maxPos = 100, speed = 1, bottom = 32, setWinner, raceStarted }) => {
    const [duckPos, setDuckPos] = useState(0);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        setDuckPos(0)
    }, [raceStarted])

    useEffect(() => {
        const interval = setInterval(() => {
        setDuckPos((prev) => {
            if (finished) return prev; 

            const next = prev + Math.random() * speed;

            if (next >= maxPos) {
                setFinished(true);
                setWinner((prev) => prev || number);
                return maxPos;
            }

            return next;
        });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
        className="absolute w-32 transition-left"
        style={{
            bottom: `${bottom}px`,
            left: `${duckPos}%`,
            zIndex: 10 - number, // lower number = higher z
        }}
        >
        <img
            src="/duck-toy.png"
            alt="Duck"
            className="w-full h-auto"
        />
        {/* Number label above duck */}
        <p className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm pointer-events-none">
            {number}
        </p>
        </div>
    );
};

export default Duck;
