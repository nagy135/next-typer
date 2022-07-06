import { Game } from "@prisma/client";
import { useGlobalContext } from "./contexts/global";
import { XCircleIcon } from "@heroicons/react/solid";
import { CSSProperties, useState } from "react";
import { CPM_TO_WPM } from "@constants/common";

const GameBody: React.FC<{ game: Game }> = ({ game }) => {
  const global = useGlobalContext();

  const [remaining, setRemaining] = useState(game.text);
  const [written, setWritten] = useState("");
  const [writtenCount, setWrittenCount] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [start, setStart] = useState<number | null>(null);

  const handleTyping = (e: string) => {
    if (game.text[writtenCount] === e) {
      if (!start) setStart(Date.now());
      else {
        const elapsedSec = (Date.now() - start) / 1000;
        setWpm(Math.round(writtenCount / CPM_TO_WPM / (elapsedSec / 60)));
      }

      setWrittenCount((x) => x + 1);
      setRemaining((x) => x.slice(1));
      setWritten((x) => x + e);
    }
  };

  const progress = Math.round((writtenCount / game.text.length) * 100);

  return global.playing ? (
    <div className="mt-2 bg-base-200 flex relative">
      <div className="absolute left-0 top-0 m-2 flex flex-col">
        <div className="badge p-4 mb-2">WPM: {wpm}</div>
        <div
          className="radial-progress"
          style={{ "--value": progress } as CSSProperties}
        >
          {progress}%
        </div>
      </div>
      <button
        className="absolute right-0 top-0 m-2"
        onClick={() => global.setPlaying(false)}
      >
        <XCircleIcon className="h-10 w-10 text-red-500" />
      </button>
      <div
        className="textarea textarea-bordered text-center mx-auto w-1/2 my-2 h-96 hover:drop-shadow-lg"
        onChange={() => {}}
        style={{caretColor: 'rgba(0,0,0,0)'}}
        onKeyPress={(e) => {
          e.preventDefault();
          handleTyping(e.key);
        }}
        contentEditable
        suppressContentEditableWarning
      >
        <span className="text-green-400">{written}</span>{remaining}
      </div>
    </div>
  ) : null;
};

export default GameBody;
