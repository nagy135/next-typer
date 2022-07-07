import { Game } from "@prisma/client";
import styled from "styled-components";
import { useGlobalContext } from "./contexts/global";
import Api from "services/internal/api";
import { useEffect, useState } from "react";
import { TPlayerProgress } from "@services/internal/api/get-game-progresses";

const GameBoard: React.FC<{ game: Game }> = ({ game }) => {
  const global = useGlobalContext();

  const [progresses, setProgresses] = useState<TPlayerProgress[]>([]);

  const startGame = async () => {
    const userId = await Api.createNewUser(global.nickname);
    global.setUserId(userId);
    global.setPlaying(true);
  };

  useEffect(() => {
    if (!global.freshProgresses) {
      Api.getGameProgresses(game.id).then((e) => {
        setProgresses(e);
        global.setFreshProgresses(true);
      });
    }
  }, [global.playing]);

  return (
    <div className="hero mt-2 bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">{game.title}</h1>

          <ul>
            {progresses.map((e) => (
              <li>
                {e.userName} - {e.progress}
              </li>
            ))}
          </ul>
          {global.playing ? null : (
            <StyledButton
              style={{
                opacity: global.nickname !== "" ? 1 : 0,
              }}
              onClick={startGame}
              className="btn btn-warning"
            >
              Play
              {global.nickname !== "" && (
                <span className="text-red-600">{` - as ${global.nickname}`}</span>
              )}
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
