import { Game } from "@prisma/client";
import { useGlobalContext } from "./contexts/global";
import { XCircleIcon } from "@heroicons/react/solid";
import { useState } from "react";

const GameBody: React.FC<{ game: Game }> = ({ game }) => {
  const [remaining, setRemaining] = useState(game.text);
  const [writtenCount, setWrittenCount] = useState(0);

  const handleTyping = (e: string) => {
    if (game.text[writtenCount] === e) {
      setWrittenCount(x => x + 1);
      setRemaining(x => x.slice(1));
    }
  }

  const global = useGlobalContext();
  return global.playing ? (
    <div className="mt-2 bg-base-200 flex relative">
      <button
        className="absolute right-0 top-0 m-2"
        onClick={() => global.setPlaying(false)}
      >
        <XCircleIcon className="h-10 w-10 text-red-500" />
      </button>
      <textarea
        className="textarea textarea-bordered text-center mx-auto w-1/2 my-2 h-96 hover:drop-shadow-lg"
        onKeyPress={(e) => handleTyping(e.key)}
        value={remaining} />
    </div>
  ) : null;
};

export default GameBody;
