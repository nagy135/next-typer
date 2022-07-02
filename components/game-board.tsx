import { Game } from "@prisma/client";
import styled from "styled-components";
import { useGlobalContext } from "./contexts/global";

const GameBoard: React.FC<{ game: Game }> = ({ game }) => {
  const global = useGlobalContext();
  const startGame = () => {
    global.setPlaying(true);
  };
  return (
    <div className="hero mt-2 bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">{game.title}</h1>
          <p className="py-6">{game.text}</p>
          {global.playing ? null : (
            <StyledButton
              style={{
                opacity: global.nickname !== "" ? 1 : 0,
              }}
              onClick={startGame}
              className="btn btn-primary"
            >
              Play{global.nickname !== "" && <span className="text-yellow-400">{` - as ${global.nickname}`}</span>}
            </StyledButton>
          )}
        </div>
      </div>
    </div>
  );
};

const StyledButton = styled.button`
  opacity: 1;
  transition: opacity 1s;
`;

export default GameBoard;
