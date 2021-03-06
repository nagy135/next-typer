import { Game } from "@prisma/client";
import { useGlobalContext } from "./contexts/global";
import { XCircleIcon } from "@heroicons/react/solid";
import React, { CSSProperties, useMemo, useRef, useState } from "react";
import { CPM_TO_WPM, UPDATE_EVERY_PERCENTAGE } from "@constants/common";
import Api from "services/internal/api";

const GameBody: React.FC<{ game: Game }> = ({ game }) => {
  const global = useGlobalContext();

  const [remaining, setRemaining] = useState(game.text);
  const [written, setWritten] = useState("");
  const [writtenCount, setWrittenCount] = useState(0);
  const [wpm, setWpm] = useState(0);
  const alreadyHitProgress = useRef<number>(0);
  const currentPartStart = useRef<number | null>(null);
  const currentDiscardedChars = useRef<number>(0); // how many chars are not counted in current WPM (only consider last UPDATE_EVERY_PERCENTAGE piece)

  const progress = useMemo(
    () => Math.round((writtenCount / game.text.length) * 100),
    [writtenCount]
  );

  const handleTyping = async (e: string) => {
    if (game.text[writtenCount] === e) {
      if (!currentPartStart.current) currentPartStart.current = Date.now();
      else {
        const now = Date.now();
        const elapsedSec = Math.round((now - currentPartStart.current) / 1000);
        let currentWpm = Math.round(
          (writtenCount - currentDiscardedChars.current) /
            CPM_TO_WPM /
            (elapsedSec / 60)
        );
        if (currentWpm === Infinity) currentWpm = 0;
        setWpm(currentWpm);
        if (global.userId)
          if (
            progress > alreadyHitProgress.current &&
            progress % UPDATE_EVERY_PERCENTAGE === 0
          ) {
            currentDiscardedChars.current = writtenCount;
            currentPartStart.current = now;
            alreadyHitProgress.current = progress;
            global.setFreshProgresses(false);
            Api.updateGameProgress(
              game.id,
              global.userId,
              progress,
              currentWpm
            );
          }
      }
      setWrittenCount((x) => x + 1);
      setRemaining((x) => x.slice(1));
      setWritten((x) => x + e);
    }
  };

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
        style={{ caretColor: "rgba(0,0,0,0)" }}
        onKeyDown={(e) => {
          e.preventDefault();
          handleTyping(e.key);
        }}
        contentEditable
        suppressContentEditableWarning
      >
        <span className="text-green-400">{written}</span>
        {remaining}
      </div>
    </div>
  ) : null;
};

export default GameBody;
