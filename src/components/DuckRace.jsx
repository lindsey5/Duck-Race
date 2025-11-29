import { useState, useEffect, useRef } from "react";
import { Activity } from "lucide-react"; // Using Activity as duck placeholder

const DuckRace = () => {
  const [duck1Pos, setDuck1Pos] = useState(0);
  const [duck2Pos, setDuck2Pos] = useState(0);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (winner) return;

    const interval = setInterval(() => {
      setDuck1Pos((prev) => {
        const next = prev + Math.random() * 0.5;
        if (next >= 90) setWinner("Duck 1 Wins!");
        return next;
      });

      setDuck2Pos((prev) => {
        const next = prev + Math.random() * 0.5;
        if (next >= 90) setWinner("Duck 2 Wins!");
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [winner]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-blue-300 to-white">
      {/* Ducks as Lucide icons */}
      <Activity
        className="absolute bottom-32 w-16 h-16 text-yellow-400 transition-left"
        style={{ left: `${duck1Pos}%` }}
      />
      <Activity
        className="absolute bottom-16 w-16 h-16 text-orange-400 transition-left"
        style={{ left: `${duck2Pos}%` }}
      />

      {/* Winner Display */}
      {winner && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-yellow-500">
          {winner}
        </div>
      )}
    </div>
  );
};

export default DuckRace;
