import { useGlobalContext } from "./contexts/global";
import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";

const NewGame: React.FC = () => {
  const global = useGlobalContext();
  const router = useRouter();

  const [gameName, setGameName] = useState("Testing game");
  /**
   *  calls api to generate new game, refreshes page
   *
   * @author Viktor Nagy <viktor.nagy@01people.com>
   */
  const createNewGame = async () => {
    fetch("/api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: gameName,
      }),
    }).then(() => router.reload());
  };

  return (
    <StyledDiv className="ml-3 container">
      <div className="form-control flex max-w-md">
        <label className="label">
          <span className="label-text">Generate new game</span>
        </label>
        <label className="input-group input-group">
          <span>Game name</span>
          <input
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            className="input input-bordered"
          />
        </label>
        <button onClick={createNewGame} className="btn btn-xs w-40 mt-2 mb-2">
          Create
        </button>
      </div>
      <hr />
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  opacity: 1;
  transition: opacity 1s;
`;

export default NewGame;
