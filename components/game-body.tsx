import { Game } from "@prisma/client";
import styled from "styled-components";
import { useGlobalContext } from "./contexts/global";
import { XCircleIcon } from "@heroicons/react/solid";

const GameBody: React.FC<{ game: Game }> = ({ game }) => {
  const global = useGlobalContext();
  const startGame = () => {};
  return global.playing ? (
    <div className="hero mt-2 bg-base-200 relative">
      <button
        className="absolute right-0 top-0 m-2"
        onClick={() => global.setPlaying(false)}
      >
        <XCircleIcon className="h-10 w-10 text-red-500" />
      </button>
      <div className="hero-content text-center">
        blablabla
        blablabla
        blablabla
        blablabla
        blablabla
        blablabla
        blablabla
        blablabla
      </div>
    </div>
  ) : null;
};

export default GameBody;
