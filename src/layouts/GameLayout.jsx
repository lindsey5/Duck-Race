import { useState } from "react";
import Duck from "../components/Duck";

const GameLayout = () => {
  const ducksLength = 5;
  const duckGap = 120;

  const [winner, setWinner] = useState(null);
  const [raceStarted, setRaceStarted] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  // Start the race
  const startRace = () => {
    setWinner(null);
    setRaceStarted(true);

    // Reset leaderboard
    setLeaderboard(
      Array.from({ length: ducksLength }, (_, i) => ({
        number: i + 1,
        pos: 0
      }))
    );
  };

  const handleSetWinner = (number) => {
    setWinner(number);
    setRaceStarted(false);
  };

  // Track duck position in leaderboard
  const handleProgress = (number, pos) => {
    setLeaderboard(prev =>
      prev.map(d =>
        d.number === number ? { ...d, pos } : d
      )
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-blue-500 to-blue-100">

      {/* Moving Grass / Trees */}
      <div className="absolute top-0 left-0 w-[200%] h-[20%] bg-[url('/grass.png')] bg-[length:256px_100%] bg-repeat-x"></div>

      {/* Finish Line */}
      <div className="absolute top-0 right-20 h-full w-2 bg-black z-20"></div>

      {/* Bottom Grass */}
      <div className="absolute bottom-0 left-0 w-[200%] h-[20%] bg-[url('/grass.png')] bg-[length:256px_100%] bg-repeat-x z-20"></div>

      {/* Checkered Finish Flag */}
      <div className="absolute top-0 right-16 h-full w-8 z-20 flex flex-col">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 ${i % 2 === 0 ? 'bg-black' : 'bg-white'}`}
          ></div>
        ))}
      </div>

      {/* Title */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30">
        <h1 className="text-5xl font-black text-white drop-shadow-lg tracking-wider">
          🦆 DUCK RACE 🦆
        </h1>
      </div>

      {/* Start Button */}
      {!raceStarted && !winner && (
        <button
          onClick={startRace}
          className="absolute top-24 left-1/2 -translate-x-1/2 bg-gradient-to-r 
            from-yellow-400 to-orange-500 text-white font-black py-4 px-8 
            rounded-full shadow-2xl z-30 text-xl hover:scale-110 border-4 border-white transition-all"
        >
          🏁 START RACE! 🏁
        </button>
      )}

      {/* Restart Button */}
      {winner && (
        <button
          onClick={startRace}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-gradient-to-r 
            from-green-400 to-blue-500 text-white font-bold py-3 px-6 rounded-full 
            shadow-xl z-30 hover:scale-105 border-2 border-white transition-all"
        >
          🔄 Race Again
        </button>
      )}

      {/* Ducks */}
      {Array.from({ length: ducksLength }).map((_, index) => (
        <Duck
          key={index}
          number={index + 1}
          bottom={50 + index * duckGap}
          maxPos={90}
          setWinner={handleSetWinner}
          raceStarted={raceStarted}
          onProgress={handleProgress}
          winner={winner}
        />
      ))}

      {winner && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          text-4xl font-bold text-yellow-500 z-30">
          Duck {winner} Wins!
        </div>
      )}

      {winner && <div className="absolute top-28 right-10 bg-white/80 backdrop-blur-md shadow-xl
        p-4 rounded-xl z-30 w-44 border border-gray-300">
        <h2 className="text-xl font-bold mb-2">🏆 Leaderboard</h2>

        {leaderboard
          .slice()
          .sort((a, b) => b.pos - a.pos)
          .map((d, i) => (
            <p key={d.number} className="text-lg font-medium">
              #{i + 1} — Duck {d.number}
            </p>
          ))}
      </div>}

    </div>
  );
};

export default GameLayout;
