import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import Api from "@services/internal/api";

const NewGame: React.FC = () => {
  const router = useRouter();

  const [gameName, setGameName] = useState("Testing game");

  const createNewGameHandler = async () => {
    Api.createNewGame(gameName).then(() => router.reload());
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
        <button onClick={createNewGameHandler} className="btn btn-xs w-40 my-2">
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
