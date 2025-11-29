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
      
    </div>
  );
};

export default DuckRace;
